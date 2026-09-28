#!/usr/bin/env python3
"""Check the route store's S3 signer against botocore, offline.

apps/web/src/lib/routes/sigv4.ts signs S3 GetObject and HeadObject requests
by hand so the site needs no AWS SDK. This signs the same requests with botocore's
S3SigV4Auth at a fixed moment and compares the Authorization headers. No
network call is made and the credentials are made up.

    python3 scripts/s3/check_sigv4.py
"""
from __future__ import annotations

import datetime
import json
import subprocess
import sys
import tempfile
from pathlib import Path
from unittest import mock

from botocore.auth import S3SigV4Auth
from botocore.awsrequest import AWSRequest
from botocore.credentials import Credentials

ROOT = Path(__file__).resolve().parents[2]
SIGNER = ROOT / "apps" / "web" / "src" / "lib" / "routes" / "sigv4.ts"
MOMENT = datetime.datetime(2026, 9, 27, 21, 14, 48)

CASES = [
    # method, bucket, region, key, access key, secret, session token
    ("GET", "example-private", "us-east-1", "routes/abc-def-1234/route.json", "AKIDEXAMPLE", "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY", None),
    ("GET", "example-private", "ap-southeast-2", "routes/abc-def-1234/cards/a b(1)!.pdf", "AKIDEXAMPLE2", "secret/with+chars=", None),
    ("GET", "example-private", "us-east-1", "routes/x/tideline-outdoor-register.json", "ASIAEXAMPLE", "s3cr3t", "session-token-value"),
    ("HEAD", "example-private", "us-east-1", "routes/abc-def-1234/cards/card-a5.pdf", "AKIDEXAMPLE", "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY", None),
]


def ts_side() -> list[str]:
    source = SIGNER.read_text(encoding="utf-8").replace('import "server-only";\n', "")
    script = f"""
const ts = require({json.dumps(str(ROOT / "node_modules" / "typescript"))});
const out = ts.transpileModule({json.dumps(source)}, {{ compilerOptions: {{ module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }} }});
const m = {{ exports: {{}} }};
new Function("module", "exports", "require", out.outputText)(m, m.exports, require);
const cases = {json.dumps(CASES)};
const now = new Date({json.dumps(MOMENT.isoformat() + "Z")});
console.log(JSON.stringify(cases.map(([method, b, r, k, a, s, t]) =>
  m.exports.signS3Request(b, r, k, {{ accessKeyId: a, secretAccessKey: s, sessionToken: t || undefined }}, now, method))));
"""
    with tempfile.NamedTemporaryFile("w", suffix=".cjs", delete=False) as f:
        f.write(script)
    result = subprocess.run(["node", f.name], capture_output=True, text=True, check=True)
    return [(r["url"], r["headers"]["authorization"]) for r in json.loads(result.stdout)]


def boto_side() -> list[str]:
    out = []
    for method, bucket, region, key, ak, sk, token in CASES:
        from urllib.parse import quote
        url = f"https://{bucket}.s3.{region}.amazonaws.com/{quote(key, safe='/~')}"
        request = AWSRequest(method=method, url=url, data=b"")
        signer = S3SigV4Auth(Credentials(ak, sk, token), "s3", region)
        with mock.patch("botocore.auth.datetime") as dt:
            dt.datetime.utcnow.return_value = MOMENT
            signer.add_auth(request)
        out.append((url, request.headers["Authorization"]))
    return out


def main() -> int:
    ours, theirs = ts_side(), boto_side()
    failures = 0
    for (case, mine, boto) in zip(CASES, ours, theirs):
        same = mine == boto
        failures += not same
        print(f"{'same' if same else 'DIFFERENT'}  {case[0]} {case[3]}")
        if not same:
            print(f"  ours:     {mine}\n  botocore: {boto}")
    print("the signer matches botocore" if not failures else f"{failures} case(s) differ")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
