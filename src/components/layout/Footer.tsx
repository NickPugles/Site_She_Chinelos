export function Footer() {
  return (
    <footer id="contato" className="mt-12 bg-rosa-escuro pt-10 pb-4 text-white">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-bold">She Chinelos 👡</h2>
            <p className="mt-1 text-sm">
              Chinelos personalizados de acordo com cada gosto.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold">Contato</h2>
            <ul className="mt-1 space-y-1 text-sm">
              <li>📞 (15) 99826-4089</li>
              <li>
                ✉️{" "}
                <a
                  href="mailto:contato@shechinelos.com.br"
                  className="text-rosa-claro transition-colors hover:text-white hover:underline"
                >
                  contato@shechinelos.com.br
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold">Atendimento</h2>
            <p className="mt-1 text-sm">Seg a Sex: 9h às 18h</p>
            <p className="text-sm">Sábado: 9h às 13h</p>
          </div>
        </div>

        <hr className="my-4 border-white/30" />

        <p className="text-center text-sm">
          &copy; 2026 She Chinelos — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
