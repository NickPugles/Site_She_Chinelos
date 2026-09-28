"use client";

import { usePassouDoTopo } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function BotaoTopo() {
  const visivel = usePassouDoTopo(300);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Voltar ao topo"
      aria-label="Voltar ao topo"
      className={cn(
        "fixed right-6 bottom-6 z-50 h-12 w-12 rounded-full bg-rosa text-xl text-white shadow-card-hover transition-all duration-300 hover:bg-rosa-escuro",
        visivel ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      ↑
    </button>
  );
}
