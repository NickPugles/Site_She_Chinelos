import { Carrossel } from "@/components/ui/Carrossel";
import { CartaoProduto } from "@/components/ui/CartaoProduto";
import { CATALOGO } from "@/lib/catalogo";

export default function Page() {
  return (
    <>
      <div id="inicio" />

      <Carrossel />

      <section
        id="produtos"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-10"
      >
        <h2 className="mb-10 text-center text-3xl font-bold text-rosa-escuro">
          Nossos Produtos
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATALOGO.map((produto) => (
            <CartaoProduto key={produto.id} produto={produto} />
          ))}
        </div>
      </section>

      <section id="sobre" className="scroll-mt-20 bg-rosa-claro py-10">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-3xl font-bold text-rosa-escuro">Sobre Nós</h2>
          <p className="text-lg">
            A <strong className="font-bold text-rosa-escuro">She Chinelos</strong>{" "}
            cria chinelos personalizados de acordo com cada gosto. Cada par é feito
            com carinho para unir conforto, qualidade e um estilo único que só
            você tem.
          </p>
        </div>
      </section>
    </>
  );
}
