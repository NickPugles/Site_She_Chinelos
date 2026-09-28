import type { Metadata } from "next";
import { BotaoTopo } from "@/components/layout/BotaoTopo";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ToastProvider } from "@/components/ui/Toast";
import { CarrinhoProvider } from "@/lib/carrinho-context";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shechinelos.com.br"),
  title: {
    default: "She Chinelos - Chinelos Personalizados",
    template: "%s | She Chinelos",
  },
  description:
    "Chinelos personalizados de acordo com cada gosto. Conforto, qualidade e um estilo único que só você tem.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <CarrinhoProvider>
          <ToastProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <BotaoTopo />
          </ToastProvider>
        </CarrinhoProvider>
      </body>
    </html>
  );
}
