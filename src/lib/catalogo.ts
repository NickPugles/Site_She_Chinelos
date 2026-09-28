export const TAMANHOS = [33, 34, 35, 36, 37, 38, 39, 40, 41] as const;

export type Tamanho = (typeof TAMANHOS)[number];

export type Produto = {
  id: string;
  nome: string;
  preco: number;
  precoAntigo: number | null;
  imagem: string;
  tag: string | null;
  descricaoCurta: string;
  descricaoLonga: string;
};

export const CATALOGO: Produto[] = [
  {
    id: "p1",
    nome: "Chinelo Feminino Floral",
    preco: 39.9,
    precoAntigo: null,
    imagem: "/imagens/chinelo-1.jpg",
    tag: "Novo",
    descricaoCurta: "Vários tamanhos e cores",
    descricaoLonga:
      "Chinelo personalizado com estampa floral, feito sob medida para o seu estilo. Conforto e qualidade para o seu dia a dia.",
  },
  {
    id: "p2",
    nome: "Chinelo Personalizado Premium",
    preco: 49.9,
    precoAntigo: null,
    imagem: "/imagens/chinelo-2.jpg",
    tag: "Mais vendido",
    descricaoCurta: "Estampa personalizada",
    descricaoLonga:
      "Chinelo com estampa personalizada de alta definição. Escolha seu tamanho e leve conforto premium com o toque exclusivo She Chinelos.",
  },
  {
    id: "p3",
    nome: "Chinelo Casual Confort",
    preco: 34.9,
    precoAntigo: 44.9,
    imagem: "/imagens/chinelo-1.jpg",
    tag: "Promoção",
    descricaoCurta: "Solado macio antiderrapante",
    descricaoLonga:
      "Ideal para o uso casual de todos os dias, com solado macio e antiderrapante que garante segurança e bem-estar a cada passo.",
  },
  {
    id: "p4",
    nome: "Chinelo Edição Especial",
    preco: 54.9,
    precoAntigo: null,
    imagem: "/imagens/chinelo-2.jpg",
    tag: null,
    descricaoCurta: "Design exclusivo She Chinelos",
    descricaoLonga:
      "Design exclusivo da coleção She Chinelos, produzido em material premium com acabamento reforçado. Uma edição para quem busca exclusividade.",
  },
  {
    id: "p5",
    nome: "Chinelo Infantil Divertido",
    preco: 29.9,
    precoAntigo: null,
    imagem: "/imagens/chinelo-2.jpg",
    tag: null,
    descricaoCurta: "Tamanhos infantis",
    descricaoLonga:
      "Conforto e diversão para os pequenos! Estampas alegres, material leve e resistente, perfeito para brincar com segurança.",
  },
  {
    id: "p6",
    nome: "Kit Casal Matching",
    preco: 79.9,
    precoAntigo: null,
    imagem: "/imagens/chinelo-1.jpg",
    tag: "Novo",
    descricaoCurta: "2 pares personalizados",
    descricaoLonga:
      "Dois pares com estampas combinando para você e seu amor. Personalização inclusa nos dois pares do kit.",
  },
  {
    id: "p7",
    nome: "Chinelo Praia Verão",
    preco: 32.9,
    precoAntigo: null,
    imagem: "/imagens/chinelo-1.jpg",
    tag: null,
    descricaoCurta: "Resistente à água",
    descricaoLonga:
      "Companheiro ideal para praia e piscina: material resistente à água, secagem rápida e solado que não marca areia.",
  },
  {
    id: "p8",
    nome: "Chinelo Clássico Básico",
    preco: 22.9,
    precoAntigo: 27.9,
    imagem: "/imagens/chinelo-2.jpg",
    tag: "Promoção",
    descricaoCurta: "O conforto de sempre",
    descricaoLonga:
      "O clássico que nunca sai de moda: modelo básico, leve e confortável, com aquele preço que cabe no bolso.",
  },
];

export function buscarProduto(id: string): Produto | null {
  return CATALOGO.find((produto) => produto.id === id) ?? null;
}

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarPreco(valor: number): string {
  return formatadorMoeda.format(valor);
}
