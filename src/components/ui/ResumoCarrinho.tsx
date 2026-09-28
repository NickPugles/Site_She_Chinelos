import type { ReactNode } from "react";
import { formatarPreco } from "@/lib/catalogo";
import { BarraFrete } from "./BarraFrete";

type ResumoCarrinhoProps = {
  subtotal: number;
  frete: number;
  titulo?: string;
  comBarraFrete?: boolean;
  children?: ReactNode;
};

export function ResumoCarrinho({
  subtotal,
  frete,
  titulo = "Resumo do pedido",
  comBarraFrete = false,
  children,
}: ResumoCarrinhoProps) {
  return (
    <div className="rounded-[14px] bg-white p-6 shadow-card">
      <h2 className="mb-3 font-bold">{titulo}</h2>

      {comBarraFrete && <BarraFrete subtotal={subtotal} frete={frete} />}

      <div className="mb-1 flex justify-between">
        <span className="text-neutral-500">Subtotal</span>
        <span>{formatarPreco(subtotal)}</span>
      </div>

      <div className="mb-1 flex justify-between">
        <span className="text-neutral-500">Frete</span>
        <span>{frete === 0 ? "Grátis 🎉" : formatarPreco(frete)}</span>
      </div>

      <hr className="my-2 border-neutral-200" />

      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-bold">Total</span>
        <span className="text-2xl font-bold text-rosa">
          {formatarPreco(subtotal + frete)}
        </span>
      </div>

      {children}
    </div>
  );
}
