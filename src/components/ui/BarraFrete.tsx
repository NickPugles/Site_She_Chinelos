import { FRETE_GRATIS_ACIMA, progressoFreteGratis } from "@/lib/carrinho";
import { formatarPreco } from "@/lib/catalogo";

type BarraFreteProps = {
  subtotal: number;
  frete: number;
};

export function BarraFrete({ subtotal, frete }: BarraFreteProps) {
  return (
    <div className="mb-4">
      <p className="mb-1 text-xs text-neutral-500">
        {frete === 0 ? (
          <>Parabéns! Você ganhou frete grátis. 🎉</>
        ) : (
          <>
            Faltam {formatarPreco(FRETE_GRATIS_ACIMA - subtotal)} para você ganhar
            frete grátis!
          </>
        )}
      </p>

      <div
        role="progressbar"
        aria-label="Progresso para o frete grátis"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progressoFreteGratis(subtotal))}
        className="h-2 overflow-hidden rounded-full bg-rosa-claro"
      >
        <div
          className="h-full rounded-full bg-rosa transition-[width] duration-300"
          style={{ width: `${progressoFreteGratis(subtotal)}%` }}
        />
      </div>
    </div>
  );
}
