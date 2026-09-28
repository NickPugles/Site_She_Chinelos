"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { formatarPreco } from "@/lib/catalogo";
import { calcularFrete } from "@/lib/carrinho";
import { useCarrinho } from "@/lib/carrinho-context";
import {
  CAMPOS_CLIENTE,
  CAMPOS_ENDERECO,
  FORMAS_PAGAMENTO,
  gerarNumeroPedido,
  validarCheckout,
  type DadosCheckout,
} from "@/lib/checkout";
import { cn } from "@/lib/utils";
import { CampoFormulario } from "./CampoFormulario";
import { ResumoCarrinho } from "./ResumoCarrinho";

const TODOS_OS_CAMPOS = [...CAMPOS_CLIENTE, ...CAMPOS_ENDERECO];

interface Confirmacao {
  numero: string;
  total: number;
}

export function FormularioCheckout() {
  const { itens, limpar } = useCarrinho();
  const [valores, setValores] = useState<DadosCheckout>(() =>
    Object.fromEntries(TODOS_OS_CAMPOS.map((campo) => [campo.id, ""])),
  );
  const [erros, setErros] = useState<Record<string, string>>({});
  const [pagamento, setPagamento] = useState<string>(FORMAS_PAGAMENTO[0].valor);
  const [confirmacao, setConfirmacao] = useState<Confirmacao | null>(null);

  const subtotal = itens.reduce((soma, item) => soma + item.preco * item.qtd, 0);
  const frete = calcularFrete(subtotal);

  function aoAlterar(id: string, valor: string) {
    setValores((atuais) => ({ ...atuais, [id]: valor }));
    setErros((atuais) => {
      if (!atuais[id]) return atuais;

      const proximos = { ...atuais };
      delete proximos[id];
      return proximos;
    });
  }

  function finalizar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const problemas = validarCheckout(valores);
    if (Object.keys(problemas).length > 0) {
      setErros(problemas);
      return;
    }

    setConfirmacao({ numero: gerarNumeroPedido(), total: subtotal + frete });
    limpar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (confirmacao) {
    return (
      <div className="py-12 text-center">
        <p className="text-6xl" aria-hidden="true">
          🎉
        </p>
        <h1 className="mt-2 mb-3 text-3xl font-bold text-rosa-escuro">
          Pedido confirmado!
        </h1>
        <p className="mb-1 text-xl">
          Número do pedido:{" "}
          <strong className="text-2xl text-rosa">{confirmacao.numero}</strong>
        </p>
        <p className="mb-6 text-neutral-500">
          Obrigado por comprar na She Chinelos! Você receberá as instruções de
          pagamento e o código de rastreio por e-mail ({formatarPreco(confirmacao.total)}{" "}
          em {pagamento.toLowerCase()}).
        </p>
        <Link
          href="/"
          className="rounded-full bg-rosa px-8 py-2.5 font-semibold text-white transition-colors hover:bg-rosa-escuro"
        >
          Voltar à loja
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-rosa-escuro">Finalizar Compra</h1>

      <form onSubmit={finalizar} noValidate>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <section className="rounded-[14px] bg-white p-6 shadow-card">
              <h2 className="mb-3 font-bold">1. Seus dados</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {CAMPOS_CLIENTE.map((campo) => (
                  <CampoFormulario
                    key={campo.id}
                    {...campo}
                    valores={valores}
                    erros={erros}
                    aoAlterar={aoAlterar}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-[14px] bg-white p-6 shadow-card">
              <h2 className="mb-3 font-bold">2. Endereço de entrega</h2>
              <div className="grid gap-3 sm:grid-cols-6">
                {CAMPOS_ENDERECO.map((campo) => (
                  <CampoFormulario
                    key={campo.id}
                    {...campo}
                    valores={valores}
                    erros={erros}
                    aoAlterar={aoAlterar}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-[14px] bg-white p-6 shadow-card">
              <h2 className="mb-3 font-bold">3. Forma de pagamento</h2>
              <div className="grid gap-2">
                {FORMAS_PAGAMENTO.map((forma) => (
                  <label
                    key={forma.valor}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-xl border-2 px-4 py-3 transition-colors",
                      pagamento === forma.valor
                        ? "border-rosa bg-rosa-claro"
                        : "border-rosa-borda hover:border-rosa",
                    )}
                  >
                    <input
                      type="radio"
                      name="pagamento"
                      value={forma.valor}
                      checked={pagamento === forma.valor}
                      onChange={() => setPagamento(forma.valor)}
                      className="accent-rosa"
                    />
                    {forma.rotulo}
                  </label>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-5">
            <ResumoCarrinho
              subtotal={subtotal}
              frete={frete}
              titulo="Seu pedido"
            >
              <ul className="mb-4 space-y-1 text-sm">
                {itens.map((item) => (
                  <li
                    key={`${item.id}-${item.tamanho ?? "unico"}`}
                    className="flex justify-between gap-2"
                  >
                    <span>
                      {item.qtd}x {item.nome}{" "}
                      <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs">
                        Tam. {item.tamanho ?? "Único"}
                      </span>
                    </span>
                    <span className="font-semibold">
                      {formatarPreco(item.preco * item.qtd)}
                    </span>
                  </li>
                ))}
              </ul>

              <hr className="mb-2 border-neutral-200" />

              <button
                type="submit"
                className="w-full rounded-full bg-rosa py-3 text-lg font-semibold text-white transition-colors hover:bg-rosa-escuro"
              >
                ✅ Confirmar pedido
              </button>

              <Link
                href="/carrinho"
                className="mt-3 block text-center transition-colors hover:text-rosa"
              >
                &larr; Voltar ao carrinho
              </Link>
            </ResumoCarrinho>
          </div>
        </div>
      </form>
    </>
  );
}
