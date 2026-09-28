"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const MENSAGEM_PADRAO = "✅ Produto adicionado ao carrinho!";

type ContextoToast = {
  mostrar: (mensagem?: string) => void;
};

const Contexto = createContext<ContextoToast | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [atual, setAtual] = useState<{ id: number; mensagem: string } | null>(null);
  const [visivel, setVisivel] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mostrar = useCallback((mensagem: string = MENSAGEM_PADRAO) => {
    setAtual({ id: Date.now(), mensagem });
    setVisivel(true);
  }, []);

  useEffect(() => {
    if (!visivel) return;

    timer.current = setTimeout(() => setVisivel(false), 3000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [visivel, atual]);

  return (
    <Contexto.Provider value={{ mostrar }}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4"
      >
        {atual && (
          <div
            key={atual.id}
            role="status"
            className={cn(
              "pointer-events-auto flex items-center gap-3 rounded-xl border-0 bg-emerald-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300",
              visivel ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <span>{atual.mensagem}</span>
            <button
              type="button"
              onClick={() => setVisivel(false)}
              aria-label="Fechar aviso"
              className="text-xl leading-none text-white/80 transition-colors hover:text-white"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </Contexto.Provider>
  );
}

export function useToast(): ContextoToast {
  const contexto = useContext(Contexto);

  if (!contexto) {
    throw new Error("useToast precisa estar dentro de <ToastProvider>");
  }

  return contexto;
}
