import Image from "next/image";
import Link from "next/link";
import { formatarPreco, type Produto } from "@/lib/catalogo";
import { cn } from "@/lib/utils";

export function CartaoProduto({ produto }: { produto: Produto }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[14px] bg-white shadow-card transition duration-200 hover:-translate-y-1.5 hover:shadow-card-hover">
      {produto.tag && (
        <span
          className={cn(
            "absolute top-0 left-0 m-2 rounded-full px-2.5 py-1 text-xs font-semibold text-white",
            produto.tag === "Promoção" ? "bg-red-600" : "bg-rosa",
          )}
        >
          {produto.tag}
        </span>
      )}

      <div className="relative h-[220px] w-full shrink-0">
        <Image
          src={produto.imagem}
          alt={produto.nome}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col items-center p-4 text-center">
        <h3 className="text-lg font-semibold">
          <Link
            href={`/produto/${produto.id}`}
            className="transition-colors hover:text-rosa"
          >
            {produto.nome}
          </Link>
        </h3>

        <p className="mt-1 mb-3 text-sm text-neutral-500">
          {produto.descricaoCurta}
        </p>

        <p className="mt-auto text-xl font-bold text-rosa">
          {produto.precoAntigo !== null && (
            <s className="me-2 text-sm font-normal text-neutral-500">
              {formatarPreco(produto.precoAntigo)}
            </s>
          )}
          {formatarPreco(produto.preco)}
        </p>

        <Link
          href={`/produto/${produto.id}`}
          className="mt-4 rounded-full bg-rosa px-6 py-2 font-semibold text-white transition-colors hover:bg-rosa-escuro"
        >
          Comprar
        </Link>
      </div>
    </article>
  );
}
