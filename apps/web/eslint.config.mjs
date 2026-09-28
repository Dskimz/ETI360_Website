import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Parked pages, kept readable but not compiled (four-product site §12):
    // their components are deleted; restore them from git history.
    "_parked/**",
    "src/app/_for-providers-parked/**",
  ]),
]);

export default eslintConfig;
