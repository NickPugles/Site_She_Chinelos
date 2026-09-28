"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BadgeCarrinho } from "@/components/ui/BadgeCarrinho";
import { usePassouDoTopo, useSecaoAtiva } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const LINKS = [
  { rotulo: "Início", href: "/", alvo: "inicio" },
  { rotulo: "Produtos", href: "/#produtos", alvo: "produtos" },
  { rotulo: "Sobre", href: "/#sobre", alvo: "sobre" },
  { rotulo: "Contato", href: "/#contato", alvo: "contato" },
];

const SECOES = ["produtos", "sobre", "contato"];

export function Navbar() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);
  const comSombra = usePassouDoTopo(10);
  const secaoObservada = useSecaoAtiva(SECOES);

  const ehRaiz = pathname === "/";
  const secaoAtiva = ehRaiz ? secaoObservada : "";
  const fecharMenu = () => setMenuAberto(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 bg-rosa text-white transition-shadow duration-300",
        comSombra && "shadow-[0_2px_12px_rgba(0,0,0,0.25)]",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
        <Link href="/" onClick={fecharMenu} className="text-2xl font-bold">
          She Chinelos 👡
        </Link>

        <button
          type="button"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          aria-label="Alternar menu"
          className="ml-auto rounded-md px-2 py-1 text-2xl leading-none md:hidden"
        >
          ☰
        </button>

        <div
          id="menu-principal"
          className={cn(
            "w-full flex-col gap-1 md:ml-auto md:w-auto md:flex-row md:items-center md:gap-4",
            menuAberto ? "flex" : "hidden",
          )}
        >
          {LINKS.map((link) => {
            const ativo = secaoAtiva === link.alvo;

            return (
              <Link
                key={link.alvo}
                href={link.href}
                onClick={fecharMenu}
                aria-current={ativo ? "page" : undefined}
                className={cn(
                  "rounded px-2 py-1 font-semibold transition-colors hover:text-rosa-claro",
                  ativo && "border-b-2 border-white text-rosa-claro",
                )}
              >
                {link.rotulo}
              </Link>
            );
          })}

          <Link
            href="/carrinho"
            onClick={fecharMenu}
            title="Carrinho de compras"
            className="relative ms-lg-3 inline-block self-start rounded px-2 py-1 text-xl hover:text-rosa-claro md:self-auto"
          >
            <span aria-hidden="true">🛒</span>
            <span className="sr-only">Carrinho de compras</span>
            <BadgeCarrinho />
          </Link>
        </div>
      </div>
    </nav>
  );
}
