import type { Tamanho } from "./catalogo";

export const CHAVE_ARMAZENAMENTO = "carrinhoItens";
export const FRETE = 14.9;
export const FRETE_GRATIS_ACIMA = 99;

export type ItemCarrinho = {
  id: string;
  nome: string;
  preco: number;
  tamanho: Tamanho | null;
  qtd: number;
};

export type NovoItem = Omit<ItemCarrinho, "qtd"> & { qtd?: number };

export function chaveDoItem(id: string, tamanho: Tamanho | null): string {
  return `${id}-${tamanho ?? "unico"}`;
}

export function lerItens(): ItemCarrinho[] {
  if (typeof window === "undefined") return [];

  try {
    const bruto = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!bruto) return [];

    const dados: unknown = JSON.parse(bruto);
    if (!Array.isArray(dados)) return [];

    return dados
      .filter((item): item is ItemCarrinho => {
        if (typeof item !== "object" || item === null) return false;
        const candidato = item as Partial<ItemCarrinho>;
        return (
          typeof candidato.id === "string" &&
          typeof candidato.nome === "string" &&
          typeof candidato.preco === "number"
        );
      })
      .map((item) => ({ ...item, qtd: Math.max(1, item.qtd ?? 1) }));
  } catch {
    return [];
  }
}

export function gravarItens(itens: ItemCarrinho[]): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(itens));
  } catch {
    /* cota cheia ou storage bloqueado: o carrinho segue apenas em memória */
  }
}

export function calcularFrete(subtotal: number): number {
  return subtotal >= FRETE_GRATIS_ACIMA ? 0 : FRETE;
}

export function progressoFreteGratis(subtotal: number): number {
  return Math.min(100, (subtotal / FRETE_GRATIS_ACIMA) * 100);
}
