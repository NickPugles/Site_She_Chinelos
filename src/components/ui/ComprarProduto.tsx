"use client";

import { useState } from "react";
import type { Produto, Tamanho } from "@/lib/catalogo";
import { useCarrinho } from "@/lib/carrinho-context";
import { cn } from "@/lib/utils";
import { SeletorTamanho } from "./SeletorTamanho";
import { useToast } from "./Toast";

export function ComprarProduto({ produto }: { produto: Produto }) {
  const [tamanho, setTamanho] = useState<Tamanho | null>(null);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const { adicionar } = useCarrinho();
  const { mostrar } = useToast();

  function selecionar(opcao: Tamanho) {
    setTamanho(opcao);
    setMostrarAviso(false);
  }

  function adicionarAoCarrinho() {
    if (!tamanho) {
      setMostrarAviso(true);
      return;
    }

    adicionar({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      tamanho,
    });
    mostrar();
  }

  return (
    <div>
      <h2 className="mt-6 mb-2 font-bold">Selecione o tamanho:</h2>
      <SeletorTamanho tamanho={tamanho} aoSelecionar={selecionar} />

      <p
        role="alert"
        className={cn(
          "mt-3 rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-900",
          mostrarAviso ? "block" : "hidden",
        )}
      >
        ⚠️ Selecione um tamanho antes de continuar.
      </p>

      <button
        type="button"
        onClick={adicionarAoCarrinho}
        className="mt-2 w-full rounded-full bg-rosa py-3 text-lg font-semibold text-white transition-colors hover:bg-rosa-escuro"
      >
        🛒 Adicionar ao carrinho
      </button>
    </div>
  );
}
