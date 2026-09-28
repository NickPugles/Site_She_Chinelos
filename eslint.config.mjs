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
    // Protótipo vanilla anterior à migração para o App Router. Mantido no
    // repositório apenas como referência; nada em src/ o referencia.
    "bootstrap.bundle.min.js",
    "carrinho.js",
    "catalogo.js",
    "checkout.js",
    "produto.js",
    "script.js",
  ]),
]);

export default eslintConfig;
