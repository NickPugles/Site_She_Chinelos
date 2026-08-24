/* ============================================
   SHE CHINELOS - Catálogo de produtos
   Fonte única de dados para todas as páginas
   ============================================ */

const CATALOGO = [
    {
        id: 'p1',
        nome: 'Chinelo Feminino Floral',
        preco: 39.90,
        precoAntigo: null,
        imagem: 'Imagem_1.jpeg',
        tag: 'Novo',
        descricaoCurta: 'Vários tamanhos e cores',
        descricaoLonga: 'Chinelo personalizado com estampa floral, feito sob medida para o seu estilo. Conforto e qualidade para o seu dia a dia.'
    },
    {
        id: 'p2',
        nome: 'Chinelo Personalizado Premium',
        preco: 49.90,
        precoAntigo: null,
        imagem: 'Imagem_2.jpeg',
        tag: 'Mais vendido',
        descricaoCurta: 'Estampa personalizada',
        descricaoLonga: 'Chinelo com estampa personalizada de alta definição. Escolha seu tamanho e leve conforto premium com o toque exclusivo She Chinelos.'
    },
    {
        id: 'p3',
        nome: 'Chinelo Casual Confort',
        preco: 34.90,
        precoAntigo: 44.90,
        imagem: 'Imagem_1.jpeg',
        tag: 'Promoção',
        descricaoCurta: 'Solado macio antiderrapante',
        descricaoLonga: 'Ideal para o uso casual de todos os dias, com solado macio e antiderrapante que garante segurança e bem-estar a cada passo.'
    },
    {
        id: 'p4',
        nome: 'Chinelo Edição Especial',
        preco: 54.90,
        precoAntigo: null,
        imagem: 'Imagem_2.jpeg',
        tag: null,
        descricaoCurta: 'Design exclusivo She Chinelos',
        descricaoLonga: 'Design exclusivo da coleção She Chinelos, produzido em material premium com acabamento reforçado. Uma edição para quem busca exclusividade.'
    },
    {
        id: 'p5',
        nome: 'Chinelo Infantil Divertido',
        preco: 29.90,
        precoAntigo: null,
        imagem: 'Imagem_2.jpeg',
        tag: null,
        descricaoCurta: 'Tamanhos infantis',
        descricaoLonga: 'Conforto e diversão para os pequenos! Estampas alegres, material leve e resistente, perfeito para brincar com segurança.'
    },
    {
        id: 'p6',
        nome: 'Kit Casal Matching',
        preco: 79.90,
        precoAntigo: null,
        imagem: 'Imagem_1.jpeg',
        tag: 'Novo',
        descricaoCurta: '2 pares personalizados',
        descricaoLonga: 'Dois pares com estampas combinando para você e seu amor. Personalização inclusa nos dois pares do kit.'
    },
    {
        id: 'p7',
        nome: 'Chinelo Praia Verão',
        preco: 32.90,
        precoAntigo: null,
        imagem: 'Imagem_1.jpeg',
        tag: null,
        descricaoCurta: 'Resistente à água',
        descricaoLonga: 'Companheiro ideal para praia e piscina: material resistente à água, secagem rápida e solado que não marca areia.'
    },
    {
        id: 'p8',
        nome: 'Chinelo Clássico Básico',
        preco: 22.90,
        precoAntigo: 27.90,
        imagem: 'Imagem_2.jpeg',
        tag: 'Promoção',
        descricaoCurta: 'O conforto de sempre',
        descricaoLonga: 'O clássico que nunca sai de moda: modelo básico, leve e confortável, com aquele preço que cabe no bolso.'
    }
];

const TAMANHOS = [33, 34, 35, 36, 37, 38, 39, 40, 41];

function buscarProduto(id) {
    return CATALOGO.find(function (p) {
        return p.id === id;
    }) || null;
}

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
