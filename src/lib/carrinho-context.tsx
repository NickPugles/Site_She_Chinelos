"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  chaveDoItem,
  gravarItens,
  lerItens,
  type ItemCarrinho,
  type NovoItem,
} from "./carrinho";

const ITENS_VAZIOS: ItemCarrinho[] = [];

let cache: ItemCarrinho[] | null = null;
const ouvintes = new Set<() => void>();

function itensAtuais(): ItemCarrinho[] {
  cache ??= lerItens();
  return cache;
}

function publicar(): void {
  for (const ouvinte of ouvintes) ouvinte();
}

function sincronizar(): void {
  cache = lerItens();
  publicar();
}

function assinar(ouvinte: () => void): () => void {
  if (ouvintes.size === 0) {
    window.addEventListener("storage", sincronizar);
  }
  ouvintes.add(ouvinte);

  return () => {
    ouvintes.delete(ouvinte);
    if (ouvintes.size === 0) {
      window.removeEventListener("storage", sincronizar);
    }
  };
}

function alterar(mutacao: (itens: ItemCarrinho[]) => ItemCarrinho[]): void {
  const proximos = mutacao(itensAtuais());
  gravarItens(proximos);
  cache = proximos;
  publicar();
}

export type Carrinho = {
  itens: ItemCarrinho[];
  total: number;
  adicionar: (item: NovoItem) => void;
  definirQuantidade: (chave: string, qtd: number) => void;
  alterarQuantidade: (chave: string, delta: number) => void;
  remover: (chave: string) => void;
  limpar: () => void;
};

const ContextoCarrinho = createContext<Carrinho | null>(null);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const itens = useSyncExternalStore(assinar, itensAtuais, () => ITENS_VAZIOS);

  const valor = useMemo<Carrinho>(() => {
    const itemNo = (chave: string) => (lista: ItemCarrinho[]) =>
      lista.find((item) => chaveDoItem(item.id, item.tamanho) === chave);

    return {
      itens,
      total: itens.reduce((soma, item) => soma + item.qtd, 0),
      adicionar: (item) =>
        alterar((lista) => {
          const chave = chaveDoItem(item.id, item.tamanho);
          const existente = itemNo(chave)(lista);
          const qtd = item.qtd ?? 1;

          if (!existente) return [...lista, { ...item, qtd }];

          return lista.map((atual) =>
            atual === existente ? { ...atual, qtd: atual.qtd + qtd } : atual,
          );
        }),
      definirQuantidade: (chave, qtd) =>
        alterar((lista) =>
          lista.map((item) =>
            chaveDoItem(item.id, item.tamanho) === chave
              ? { ...item, qtd: Math.max(1, qtd) }
              : item,
          ),
        ),
      alterarQuantidade: (chave, delta) =>
        alterar((lista) => {
          const item = itemNo(chave)(lista);
          if (!item) return lista;

          return lista.map((atual) =>
            atual === item
              ? { ...atual, qtd: Math.max(1, atual.qtd + delta) }
              : atual,
          );
        }),
      remover: (chave) =>
        alterar((lista) =>
          lista.filter((item) => chaveDoItem(item.id, item.tamanho) !== chave),
        ),
      limpar: () => alterar(() => []),
    };
  }, [itens]);

  return (
    <ContextoCarrinho.Provider value={valor}>{children}</ContextoCarrinho.Provider>
  );
}

export function useCarrinho(): Carrinho {
  const contexto = useContext(ContextoCarrinho);

  if (!contexto) {
    throw new Error("useCarrinho precisa estar dentro de <CarrinhoProvider>");
  }

  return contexto;
}
