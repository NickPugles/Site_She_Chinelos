import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-20 text-center">
      <p className="text-6xl" aria-hidden="true">
        🩴
      </p>
      <h1 className="mt-2 mb-3 text-3xl font-bold text-rosa-escuro">
        Página não encontrada
      </h1>
      <p className="mb-6 text-neutral-500">
        O chinelo que você procura saiu de linha.
      </p>
      <Link
        href="/"
        className="rounded-full bg-rosa px-8 py-2.5 font-semibold text-white transition-colors hover:bg-rosa-escuro"
      >
        Voltar para a loja
      </Link>
    </main>
  );
}
