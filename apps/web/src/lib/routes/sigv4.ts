import "server-only";

import { createHash, createHmac } from "node:crypto";

/* AWS Signature Version 4 for two kinds of request: an S3 GetObject or
   HeadObject on a virtual-hosted bucket address, with an empty body. Enough
   for the private route store to read its files without pulling in the AWS
   SDK. Checked against botocore's signer (scripts/s3/check_sigv4.py). */

export type S3Credentials = { accessKeyId: string; secretAccessKey: string; sessionToken?: string };

const EMPTY_SHA256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

const hmac = (key: Buffer | string, text: string) => createHmac("sha256", key).update(text, "utf8").digest();
const sha256hex = (text: string) => createHash("sha256").update(text, "utf8").digest("hex");

/** S3's URI encoding: every byte but A-Z a-z 0-9 - _ . ~ is percent-encoded;
    the slashes between key segments stay. */
export function encodeKey(key: string) {
  return key
    .split("/")
    .map((segment) =>
      encodeURIComponent(segment).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`),
    )
    .join("/");
}

/** "20260927T211448Z" and "20260927" for a moment. */
export function amzDates(now: Date) {
  const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return { amzDate, dateStamp: amzDate.slice(0, 8) };
}

/** The URL and headers for a signed GET (or HEAD) of s3://{bucket}/{key}. */
export function signS3Request(
  bucket: string,
  region: string,
  key: string,
  creds: S3Credentials,
  now = new Date(),
  method: "GET" | "HEAD" = "GET",
): { url: string; headers: Record<string, string> } {
  const host = `${bucket}.s3.${region}.amazonaws.com`;
  const path = `/${encodeKey(key)}`;
  const { amzDate, dateStamp } = amzDates(now);

  const headers: Record<string, string> = {
    host,
    "x-amz-content-sha256": EMPTY_SHA256,
    "x-amz-date": amzDate,
  };
  if (creds.sessionToken) headers["x-amz-security-token"] = creds.sessionToken;

  const names = Object.keys(headers).sort();
  const canonicalHeaders = names.map((name) => `${name}:${headers[name].trim()}\n`).join("");
  const signedHeaders = names.join(";");
  const canonicalRequest = [method, path, "", canonicalHeaders, signedHeaders, EMPTY_SHA256].join("\n");

  const scope = `${dateStamp}/${region}/s3/aws4_request`;
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, sha256hex(canonicalRequest)].join("\n");

  const kDate = hmac(`AWS4${creds.secretAccessKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, "s3");
  const kSigning = hmac(kService, "aws4_request");
  const signature = createHmac("sha256", kSigning).update(stringToSign, "utf8").digest("hex");

  const { host: _host, ...sent } = headers;
  void _host;
  return {
    url: `https://${host}${path}`,
    headers: {
      ...sent,
      authorization: `AWS4-HMAC-SHA256 Credential=${creds.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    },
  };
}
