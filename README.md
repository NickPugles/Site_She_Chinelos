# She Chinelos 👡

Loja virtual de chinelos personalizados, agora construída com **Next.js 16**, **TypeScript**, **App Router** e **Tailwind CSS v4**.

A **She Chinelos** é uma loja fictícia de chinelos personalizados "de acordo com cada gosto". O site apresenta uma vitrine completa de e-commerce: carrossel de imagens na página inicial, catálogo de produtos, página de detalhe com seleção de tamanho (33 ao 41), carrinho de compras funcional e finalização de pedido.

## Funcionalidades

- 🎠 Carrossel automático de imagens (fade, setas e indicadores)
- 🛍️ Vitrine com 8 produtos, selos de "Novo" e "Promoção"
- 📏 Seleção de tamanho (33 a 41) em cada produto
- 🛒 Carrinho funcional: adicionar, alterar quantidade, remover itens
- 💾 Carrinho salvo no `localStorage` (persiste entre visitas)
- 🚚 Barra de progresso para frete grátis (acima de R$ 99,00)
- ✅ Checkout com validação de formulário e número de pedido
- 🧭 Navbar fixa com link ativo por seção e botão "voltar ao topo"

## Como executar

```bash
npm install
npm run dev
```

e acesse [http://localhost:3000](http://localhost:3000).

Outros scripts:

```bash
npm run build      # build de produção
npm run start      # serve o build de produção
npm run lint       # ESLint (flat config)
npm run typecheck  # tsc --noEmit
```

## Rotas

| Rota              | Descrição                                                       |
| ----------------- | --------------------------------------------------------------- |
| `/`               | Página inicial: carrossel, vitrine de produtos e "Sobre Nós"    |
| `/produto/[id]`   | Detalhe do produto (`/produto/p1` … `/produto/p8`)               |
| `/carrinho`       | Carrinho de compras com ajuste de quantidade e resumo do pedido |
| `/checkout`       | Finalização da compra com validação e número do pedido           |

## Estrutura do projeto

```
├── public/imagens/            # Fotos dos produtos servidas pelo next/image
├── src/app/
│   ├── layout.tsx             # Metadata, providers, navbar, rodapé
│   ├── globals.css            # Tailwind v4 + tokens do tema (@theme)
│   ├── page.tsx               # /
│   ├── produto/[id]/page.tsx  # /produto/[id] (rota estática)
│   ├── carrinho/page.tsx      # /carrinho
│   ├── checkout/page.tsx      # /checkout
│   └── not-found.tsx
├── src/components/
│   ├── layout/                # Navbar, Footer, BotaoTopo
│   └── ui/                    # Componentes reutilizáveis (carrossel, cards,
│                              # tabela do carrinho, formulário, toast, ...)
└── src/lib/                   # catalogo.ts, carrinho.ts, carrinho-context.tsx,
                               # checkout.ts, utils.ts
```

## Onde ficam os dados

- **Produtos e tamanhos**: `src/lib/catalogo.ts` (fonte única de verdade, usada pelo servidor e pelo cliente).
- **Carrinho**: `src/lib/carrinho.ts` (persistência em `localStorage`, chave `carrinhoItens`, regras de frete) e `src/lib/carrinho-context.tsx` (Context + `useSyncExternalStore`, seguro para SSR).
- **Validação do checkout**: `src/lib/checkout.ts`.

## Tecnologias

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [ESLint 9](https://eslint.org) com flat config (`eslint-config-next`)
