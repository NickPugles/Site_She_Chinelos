import type { CampoCheckout, DadosCheckout } from "@/lib/checkout";
import { cn } from "@/lib/utils";

type CampoFormularioProps = CampoCheckout & {
  valores: DadosCheckout;
  erros: Record<string, string>;
  aoAlterar: (id: string, valor: string) => void;
};

export function CampoFormulario({
  id,
  rotulo,
  tipo = "text",
  placeholder,
  autoComplete,
  maxLength,
  maiusculas,
  classe,
  valores,
  erros,
  aoAlterar,
}: CampoFormularioProps) {
  const erro = erros[id];

  return (
    <div className={classe}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {rotulo}
      </label>

      <input
        id={id}
        name={id}
        type={tipo}
        value={valores[id] ?? ""}
        onChange={(evento) => aoAlterar(id, evento.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={Boolean(erro)}
        className={cn(
          "w-full rounded-lg border-2 px-3 py-2 outline-none transition-colors",
          erro ? "border-red-500" : "border-rosa-borda focus:border-rosa",
          maiusculas && "uppercase",
        )}
      />

      {erro && <p className="mt-1 text-xs text-red-600">{erro}</p>}
    </div>
  );
}
