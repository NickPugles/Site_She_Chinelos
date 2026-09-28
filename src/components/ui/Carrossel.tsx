"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    imagem: "/imagens/chinelo-1.jpg",
    titulo: "Chinelos Personalizados",
    texto: "Feitos sob medida para o seu estilo.",
  },
  {
    imagem: "/imagens/chinelo-2.jpg",
    titulo: "Conforto com Estilo",
    texto: "Personalize do seu jeito, do seu gosto.",
  },
];

export function Carrossel() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(
      () => setIndice((atual) => (atual + 1) % SLIDES.length),
      5000,
    );

    return () => clearInterval(intervalo);
  }, []);

  const irPara = (novo: number) =>
    setIndice((novo + SLIDES.length) % SLIDES.length);

  return (
    <section
      id="carrossel"
      aria-roledescription="carrossel"
      aria-label="Destaques"
      className="relative h-[280px] w-full overflow-hidden md:h-[480px]"
    >
      {SLIDES.map((slide, posicao) => (
        <div
          key={slide.titulo}
          role="group"
          aria-roledescription="slide"
          aria-label={`${posicao + 1} de ${SLIDES.length}`}
          aria-hidden={posicao !== indice}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            posicao === indice ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Image
            src={slide.imagem}
            alt=""
            fill
            priority={posicao === 0}
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 hidden items-center justify-center md:flex">
            <div className="max-w-xl rounded-xl bg-black/45 px-6 py-4 text-center text-white">
              <h2 className="text-2xl font-bold">{slide.titulo}</h2>
              <p className="mt-1">{slide.texto}</p>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => irPara(indice - 1)}
        aria-label="Slide anterior"
        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-4 text-white transition-colors hover:bg-black/60"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={() => irPara(indice + 1)}
        aria-label="Próximo slide"
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-4 text-white transition-colors hover:bg-black/60"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((slide, posicao) => (
          <button
            key={slide.titulo}
            type="button"
            onClick={() => irPara(posicao)}
            aria-label={`Ir para o slide ${posicao + 1}`}
            aria-current={posicao === indice}
            className={cn(
              "h-3 w-3 rounded-full transition-colors",
              posicao === indice ? "bg-white" : "bg-white/50 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </section>
  );
}
