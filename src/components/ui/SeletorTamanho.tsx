"use client";

import { TAMANHOS, type Tamanho } from "@/lib/catalogo";
import { cn } from "@/lib/utils";

type SeletorTamanhoProps = {
  tamanho: Tamanho | null;
  aoSelecionar: (tamanho: Tamanho) => void;
};

export function SeletorTamanho({ tamanho, aoSelecionar }: SeletorTamanhoProps) {
  return (
    <div
      role="group"
      aria-label="Tamanhos disponíveis de 33 a 41"
      className="flex flex-wrap gap-2"
    >
      {TAMANHOS.map((opcao) => (
        <button
          key={opcao}
          type="button"
          onClick={() => aoSelecionar(opcao)}
          aria-pressed={tamanho === opcao}
          className={cn(
            "min-w-12 rounded-[10px] border-2 px-3.5 py-2.5 font-semibold transition-colors",
            tamanho === opcao
              ? "border-rosa bg-rosa text-white"
              : "border-rosa-borda bg-white text-texto-suave hover:border-rosa hover:text-rosa",
          )}
        >
          {opcao}
        </button>
      ))}
    </div>
  );
}
