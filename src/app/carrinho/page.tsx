import type { Metadata } from "next";
import { VistaCarrinho } from "@/components/ui/VistaCarrinho";

export const metadata: Metadata = {
  title: "Meu Carrinho",
  description: "Revise os itens do seu carrinho e finalize a compra.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <VistaCarrinho />
    </main>
  );
}
