export type CampoCheckout = {
  id: string;
  rotulo: string;
  tipo?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  maiusculas?: boolean;
  classe?: string;
};

export type DadosCheckout = Record<string, string>;

export const CAMPOS_CLIENTE: CampoCheckout[] = [
  {
    id: "nome",
    rotulo: "Nome completo",
    autoComplete: "name",
    classe: "sm:col-span-2",
  },
  {
    id: "email",
    rotulo: "E-mail",
    tipo: "email",
    autoComplete: "email",
    classe: "sm:col-span-2",
  },
  {
    id: "telefone",
    rotulo: "Telefone",
    tipo: "tel",
    placeholder: "(11) 99999-9999",
    autoComplete: "tel",
    classe: "sm:col-span-2",
  },
];

export const CAMPOS_ENDERECO: CampoCheckout[] = [
  {
    id: "cep",
    rotulo: "CEP",
    placeholder: "00000-000",
    autoComplete: "postal-code",
    classe: "sm:col-span-2",
  },
  {
    id: "rua",
    rotulo: "Rua",
    autoComplete: "address-line1",
    classe: "sm:col-span-6",
  },
  {
    id: "numero",
    rotulo: "Número",
    autoComplete: "address-line2",
    classe: "sm:col-span-2",
  },
  {
    id: "complemento",
    rotulo: "Complemento (opcional)",
    classe: "sm:col-span-4",
  },
  {
    id: "bairro",
    rotulo: "Bairro",
    autoComplete: "address-level3",
    classe: "sm:col-span-3",
  },
  {
    id: "cidade",
    rotulo: "Cidade",
    autoComplete: "address-level2",
    classe: "sm:col-span-3",
  },
  {
    id: "uf",
    rotulo: "UF",
    autoComplete: "address-level1",
    maxLength: 2,
    maiusculas: true,
    classe: "sm:col-span-2",
  },
];

export const FORMAS_PAGAMENTO = [
  { valor: "Pix", rotulo: "💠 Pix (5% de desconto)" },
  { valor: "Cartão na entrega", rotulo: "💳 Cartão na entrega" },
  { valor: "Boleto", rotulo: "🧾 Boleto bancário" },
] as const;

export function validarCheckout(dados: DadosCheckout): Record<string, string> {
  const erros: Record<string, string> = {};

  const nome = (dados.nome ?? "").trim();
  if (nome.length < 3) erros.nome = "Informe seu nome completo.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email ?? "")) {
    erros.email = "Informe um e-mail válido.";
  }

  if (!/^[\d\s()\-+]{10,}$/.test(dados.telefone ?? "")) {
    erros.telefone = "Informe um telefone válido.";
  }

  if (!/^[\d-]{8,9}$/.test(dados.cep ?? "")) {
    erros.cep = "Informe um CEP válido.";
  }

  for (const [id, mensagem] of [
    ["rua", "Informe o nome da rua."],
    ["numero", "Informe o número."],
    ["bairro", "Informe o bairro."],
    ["cidade", "Informe a cidade."],
  ] as const) {
    if (!(dados[id] ?? "").trim()) erros[id] = mensagem;
  }

  if (!/^[A-Za-z]{2}$/.test(dados.uf ?? "")) {
    erros.uf = "Informe a UF com 2 letras.";
  }

  return erros;
}

export function gerarNumeroPedido(): string {
  return `SC${Math.floor(100000 + Math.random() * 900000)}`;
}
