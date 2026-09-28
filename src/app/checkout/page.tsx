import type { Metadata } from "next";
import { VistaCheckout } from "@/components/ui/VistaCheckout";

export const metadata: Metadata = {
  title: "Finalizar Compra",
  description: "Informe seus dados e confirme o seu pedido.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <VistaCheckout />
    </main>
  );
}
