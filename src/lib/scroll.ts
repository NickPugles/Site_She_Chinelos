"use client";

import { useSyncExternalStore } from "react";

function subscreverScroll(callback: () => void): () => void {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export function usePassouDoTopo(limite: number): boolean {
  return useSyncExternalStore(
    subscreverScroll,
    () => window.scrollY > limite,
    () => false,
  );
}

export function useSecaoAtiva(ids: readonly string[]): string {
  return useSyncExternalStore(
    subscreverScroll,
    () => {
      if (window.scrollY < 80) return "inicio";

      let visivel = "inicio";
      for (const id of ids) {
        const secao = document.getElementById(id);
        if (secao && secao.getBoundingClientRect().top <= 120) visivel = id;
      }

      return visivel;
    },
    () => "",
  );
}
