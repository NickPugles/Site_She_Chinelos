"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { buscarProduto, formatarPreco } from "@/lib/catalogo";
import { chaveDoItem, type ItemCarrinho } from "@/lib/carrinho";
import { useCarrinho } from "@/lib/carrinho-context";
import { useToast } from "./Toast";

export function TabelaCarrinho() {
  const { itens } = useCarrinho();

  return (
    <div className="overflow-x-auto rounded-[14px] bg-white shadow-card">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-xs text-neutral-500">
            <th scope="col" className="px-4 py-3 text-left">
              Produto
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Tamanho
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Qtd.
            </th>
            <th scope="col" className="px-4 py-3 text-right">
              Subtotal
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Remover</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {itens.map((item) => (
            <LinhaCarrinho key={chaveDoItem(item.id, item.tamanho)} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LinhaCarrinho({ item }: { item: ItemCarrinho }) {
  const { definirQuantidade, alterarQuantidade, remover } = useCarrinho();
  const { mostrar } = useToast();
  const [quantidade, setQuantidade] = useState(String(item.qtd));
  const [quantidadeAnterior, setQuantidadeAnterior] = useState(item.qtd);
  const chave = chaveDoItem(item.id, item.tamanho);
  const produto = buscarProduto(item.id);

  if (quantidadeAnterior !== item.qtd) {
    setQuantidadeAnterior(item.qtd);
    setQuantidade(String(item.qtd));
  }

  function confirmarQuantidade() {
    const digits = Number.parseInt(quantidade, 10);

    if (!Number.isFinite(digits) || digits < 1) {
      setQuantidade(String(item.qtd));
      return;
    }

    if (digits !== item.qtd) {
      definirQuantidade(chave, digits);
    }
  }

  return (
    <tr className="border-t border-neutral-200 align-middle">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {produto && (
            <Image
              src={produto.imagem}
              alt={item.nome}
              width={70}
              height={70}
              className="h-[70px] w-[70px] rounded-[10px] object-cover"
            />
          )}
          <Link
            href={`/produto/${item.id}`}
            className="font-semibold transition-colors hover:text-rosa"
          >
            {item.nome}
          </Link>
        </div>
      </td>

      <td className="px-4 py-3 text-center">
        <span className="rounded-full bg-neutral-200 px-2.5 py-1 text-xs">
          {item.tamanho ?? "Único"}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => alterarQuantidade(chave, -1)}
            aria-label="Diminuir quantidade"
            className="h-8 w-8 rounded-full border-2 border-rosa-borda bg-white font-bold text-rosa transition-colors hover:border-rosa hover:bg-rosa hover:text-white"
          >
            −
          </button>

          <input
            type="number"
            min={1}
            value={quantidade}
            onChange={(evento) => setQuantidade(evento.target.value)}
            onBlur={confirmarQuantidade}
            onKeyDown={(evento) => {
              if (evento.key === "Enter") evento.currentTarget.blur();
            }}
            aria-label={`Quantidade de ${item.nome}`}
            className="h-8 w-14 rounded-lg border-2 border-rosa-borda text-center font-semibold text-neutral-800 outline-none focus:border-rosa"
          />

          <button
            type="button"
            onClick={() => alterarQuantidade(chave, 1)}
            aria-label="Aumentar quantidade"
            className="h-8 w-8 rounded-full border-2 border-rosa-borda bg-white font-bold text-rosa transition-colors hover:border-rosa hover:bg-rosa hover:text-white"
          >
            +
          </button>
        </div>
      </td>

      <td className="px-4 py-3 text-right font-bold">
        {formatarPreco(item.preco * item.qtd)}
      </td>

      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={() => {
            remover(chave);
            mostrar("Item removido do carrinho.");
          }}
          title="Remover item"
          aria-label={`Remover ${item.nome} do carrinho`}
          className="text-lg text-red-600 transition-colors hover:text-red-800"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}
