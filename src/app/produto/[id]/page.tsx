import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComprarProduto } from "@/components/ui/ComprarProduto";
import { buscarProduto, CATALOGO, formatarPreco } from "@/lib/catalogo";

export function generateStaticParams() {
  return CATALOGO.map((produto) => ({ id: produto.id }));
}

export async function generateMetadata(
  props: PageProps<"/produto/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const produto = buscarProduto(id);

  if (!produto) {
    return { title: "Produto não encontrado" };
  }

  return {
    title: produto.nome,
    description: produto.descricaoLonga,
    openGraph: { images: [{ url: produto.imagem }] },
  };
}

export default async function Page(props: PageProps<"/produto/[id]">) {
  const { id } = await props.params;
  const produto = buscarProduto(id);

  if (!produto) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <nav aria-label="breadcrumb">
        <ol className="mb-4 flex flex-wrap gap-2 text-sm text-neutral-500">
          <li>
            <Link href="/" className="transition-colors hover:text-rosa">
              Início
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/#produtos" className="transition-colors hover:text-rosa">
              Produtos
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-neutral-700">
            {produto.nome}
          </li>
        </ol>
      </nav>

      <div className="grid items-start gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-[14px] shadow-card">
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          {produto.tag && (
            <span className="mb-2 inline-block rounded-full bg-rosa px-3 py-1.5 text-sm font-semibold text-white">
              {produto.tag}
            </span>
          )}

          <h1 className="mb-2 text-3xl font-bold text-rosa-escuro">
            {produto.nome}
          </h1>

          <p className="mb-3">
            {produto.precoAntigo !== null && (
              <s className="me-2 text-sm text-neutral-500">
                {formatarPreco(produto.precoAntigo)}
              </s>
            )}
            <span className="text-3xl font-bold text-rosa">
              {formatarPreco(produto.preco)}
            </span>
          </p>

          <p className="text-neutral-600">{produto.descricaoLonga}</p>

          <ComprarProduto produto={produto} />

          <ul className="mt-6 list-none space-y-1 text-sm text-neutral-500">
            <li>✅ Frete grátis acima de R$ 99,00</li>
            <li>🔄 Troca fácil em até 30 dias</li>
            <li>🎨 Personalização inclusa</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
