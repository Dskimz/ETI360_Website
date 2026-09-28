import "server-only";

import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { signS3Request } from "./sigv4";

/* Where a private route page's files live. Never in this repository (it is
   public) and never under public/.

   - Deployed: a private S3 bucket, read with a read-only key scoped to the
     route prefix. Set ROUTES_S3_BUCKET, ROUTES_S3_REGION,
     ROUTES_S3_ACCESS_KEY_ID and ROUTES_S3_SECRET_ACCESS_KEY
     (ROUTES_S3_PREFIX defaults to "routes/"). Setup: scripts/s3/README.md,
     "Private route pages".
   - Local: apps/web/private/routes/{token}/ (gitignored), written by
     `npm run sync:route-private`. Used whenever no bucket is set, and never
     on Vercel (a deployment built from git has no such folder, and one
     uploaded from a laptop is not read), so a deployed route answers 404
     until the bucket is configured.

   Names are checked before they reach either store: a token is lowercase
   letters, digits and hyphens; a file name may add dots and one folder level
   (cards/...). Nothing from a request is ever joined into a path unchecked. */

const TOKEN = /^[a-z0-9](?:[a-z0-9-]{6,62})[a-z0-9]$/;
const FILE = /^(?:[a-z0-9][a-z0-9_-]*\/)?[a-z0-9][a-z0-9._-]*\.(?:json|png|pdf)$/;

export function isToken(token: string) {
  return TOKEN.test(token);
}

type S3Settings = {
  bucket: string;
  region: string;
  prefix: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
};

function s3Settings(): S3Settings | null {
  const bucket = process.env.ROUTES_S3_BUCKET;
  const accessKeyId = process.env.ROUTES_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.ROUTES_S3_SECRET_ACCESS_KEY;
  if (!bucket || !accessKeyId || !secretAccessKey) return null;
  const prefix = process.env.ROUTES_S3_PREFIX ?? "routes/";
  return {
    bucket,
    region: process.env.ROUTES_S3_REGION || "us-east-1",
    prefix: prefix && !prefix.endsWith("/") ? `${prefix}/` : prefix,
    accessKeyId,
    secretAccessKey,
    sessionToken: process.env.ROUTES_S3_SESSION_TOKEN || undefined,
  };
}

const LOCAL_ROOT = process.env.VERCEL
  ? null
  : process.env.ROUTES_PRIVATE_DIR || path.join(process.cwd(), "private", "routes");

// A deployed instance keeps what it read for a few minutes, so a page view is
// one round trip to the bucket per file at most every five minutes.
const CACHE_MS = 5 * 60 * 1000;
const cache = new Map<string, { at: number; body: Buffer | null }>();

async function readFromS3(s3: S3Settings, key: string): Promise<Buffer | null> {
  // The card PDFs are fetched only when someone opens one; they stay out of
  // the cache, which holds the small JSON files and the logo.
  const cacheable = !key.endsWith(".pdf");
  const hit = cacheable ? cache.get(key) : undefined;
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.body;
  const { url, headers } = signS3Request(s3.bucket, s3.region, key, s3);
  let body: Buffer | null = null;
  try {
    const res = await fetch(url, { headers, cache: "no-store" });
    if (res.ok) {
      body = Buffer.from(await res.arrayBuffer());
    } else if (res.status !== 403 && res.status !== 404) {
      // A missing object reads as 403 without list rights; anything else is
      // worth a line in the log, and is not cached.
      console.error(`[routes] store answered ${res.status} for a route file`);
      return null;
    }
  } catch (error) {
    console.error(`[routes] store unreachable: ${String(error)}`);
    return null;
  }
  if (cacheable) {
    cache.set(key, { at: Date.now(), body });
    if (cache.size > 500) cache.delete(cache.keys().next().value as string);
  }
  return body;
}

const known = new Map<string, { at: number; exists: boolean }>();

async function existsInS3(s3: S3Settings, key: string): Promise<boolean> {
  const hit = known.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.exists;
  const { url, headers } = signS3Request(s3.bucket, s3.region, key, s3, new Date(), "HEAD");
  try {
    const res = await fetch(url, { method: "HEAD", headers, cache: "no-store" });
    known.set(key, { at: Date.now(), exists: res.ok });
    return res.ok;
  } catch {
    return false;
  }
}

function allowed(token: string, name: string) {
  return isToken(token) && FILE.test(name) && !name.includes("..");
}

/** Whether a file of a route page is there, without reading it. */
export async function storeFileExists(token: string, name: string): Promise<boolean> {
  if (!allowed(token, name)) return false;
  const s3 = s3Settings();
  if (s3) return existsInS3(s3, `${s3.prefix}${token}/${name}`);
  if (!LOCAL_ROOT) return false;
  try {
    return (await stat(path.join(LOCAL_ROOT, token, name))).isFile();
  } catch {
    return false;
  }
}

/** One file of one route page, or null when the name is not allowed or the
    file is not there. */
export async function readStoreFile(token: string, name: string): Promise<Buffer | null> {
  if (!allowed(token, name)) return null;
  const s3 = s3Settings();
  if (s3) return readFromS3(s3, `${s3.prefix}${token}/${name}`);
  if (!LOCAL_ROOT) return null;
  try {
    return await readFile(path.join(LOCAL_ROOT, token, name));
  } catch {
    return null;
  }
}
