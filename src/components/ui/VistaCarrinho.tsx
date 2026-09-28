"use client";

import Link from "next/link";
import { calcularFrete } from "@/lib/carrinho";
import { useCarrinho } from "@/lib/carrinho-context";
import { EstadoVazio } from "./EstadoVazio";
import { ResumoCarrinho } from "./ResumoCarrinho";
import { TabelaCarrinho } from "./TabelaCarrinho";

export function VistaCarrinho() {
  const { itens } = useCarrinho();
  const subtotal = itens.reduce((soma, item) => soma + item.preco * item.qtd, 0);
  const frete = calcularFrete(subtotal);

  if (itens.length === 0) {
    return (
      <EstadoVazio
        titulo="Seu carrinho está vazio"
        descricao="Que tal dar uma olhada nos nossos chinelos personalizados?"
      />
    );
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-rosa-escuro">Meu Carrinho</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TabelaCarrinho />
          <Link
            href="/#produtos"
            className="mt-3 inline-block transition-colors hover:text-rosa"
          >
            &larr; Continuar comprando
          </Link>
        </div>

        <ResumoCarrinho
          subtotal={subtotal}
          frete={frete}
          comBarraFrete
        >
          <Link
            href="/checkout"
            className="block w-full rounded-full bg-rosa py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-rosa-escuro"
          >
            Finalizar compra &rarr;
          </Link>
        </ResumoCarrinho>
      </div>
    </>
  );
}
