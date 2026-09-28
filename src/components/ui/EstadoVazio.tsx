import Link from "next/link";

type EstadoVazioProps = {
  titulo: string;
  descricao: string;
  textoBotao?: string;
};

export function EstadoVazio({
  titulo,
  descricao,
  textoBotao = "Ver produtos",
}: EstadoVazioProps) {
  return (
    <div className="py-12 text-center">
      <p className="text-6xl" aria-hidden="true">
        🛒
      </p>
      <h1 className="mt-2 mb-3 text-3xl font-bold text-rosa-escuro">{titulo}</h1>
      <p className="mb-6 text-neutral-500">{descricao}</p>
      <Link
        href="/#produtos"
        className="rounded-full bg-rosa px-8 py-2.5 font-semibold text-white transition-colors hover:bg-rosa-escuro"
      >
        {textoBotao}
      </Link>
    </div>
  );
}
