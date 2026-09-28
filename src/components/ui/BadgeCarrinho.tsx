"use client";

import { useCarrinho } from "@/lib/carrinho-context";

export function BadgeCarrinho() {
  const { total } = useCarrinho();

  if (total === 0) return null;

  return (
    <span
      key={total}
      className="absolute top-0 left-full -translate-x-1/2 -translate-y-1/2 animate-pulso rounded-full bg-red-600 px-1.5 text-[0.65rem] leading-tight font-semibold text-white"
    >
      {total}
    </span>
  );
}
