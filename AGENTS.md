<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# She Chinelos

Loja de chinelos personalizados em Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

## Comandos

- `npm run dev` — servidor de desenvolvimento em http://localhost:3000
- `npm run build` — build de produção (Turbopack)
- `npm run lint` — ESLint flat config (`eslint .`)
- `npm run typecheck` — `tsc --noEmit` (rode `npx next typegen` antes se os tipos das rotas ainda não tiverem sido gerados)

## Rotas (em português)

- `/` — inicial: carrossel, vitrine e "Sobre Nós"
- `/produto/[id]` — detalhe do produto (ids `p1`…`p8`)
- `/carrinho` — carrinho
- `/checkout` — finalização da compra

## Convenções do projeto

- `src/lib/catalogo.ts` é a fonte única dos produtos; nada de produto hard-coded nas páginas.
- O carrinho vive em `localStorage` (chave `carrinhoItens`) e é exposto por `useCarrinho()` de `src/lib/carrinho-context.tsx`. Todo componente que lê ou escreve no carrinho é Client Component (`"use client"`).
- Tokens de cor do tema ficam em `@theme` em `src/app/globals.css` (`rosa`, `rosa-escuro`, `rosa-claro`, `rosa-borda`, `creme`, `shadow-card`). Prefira utilitários Tailwind a CSS novo.
- Textos e interface em português do Brasil; `lang="pt-BR"` no layout raiz.
- Rotas dinâmicas usam os tipos gerados: `PageProps<'/produto/[id]'>` com `await props.params` (as Request APIs são assíncronas no Next 16).
