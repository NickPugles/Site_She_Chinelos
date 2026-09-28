"use client";

import { useCarrinho } from "@/lib/carrinho-context";
import { EstadoVazio } from "./EstadoVazio";
import { FormularioCheckout } from "./FormularioCheckout";

export function VistaCheckout() {
  const { itens } = useCarrinho();

  if (itens.length === 0) {
    return (
      <EstadoVazio
        titulo="Não há nada para finalizar"
        descricao="Adicione produtos ao carrinho antes de finalizar a compra."
      />
    );
  }

  return <FormularioCheckout />;
}
