# She Chinelos 👡

Site de loja virtual de chinelos personalizados, desenvolvido com **HTML, CSS e JavaScript puros** com o framework Bootstrap 5.

A **She Chinelos** é uma loja fictícia de chinelos personalizados "de acordo com cada gosto". O site apresenta um vitrine completo de e-commerce: carrossel de imagens na página inicial, catálogo de produtos, página de detalhe com seleção de tamanho (33 ao 41), carrinho de compras funcional e finalização de pedido.

## Funcionalidades

- 🎠 Carrossel automático de imagens (fade, setas e indicadores)
- 🛍️ Vitrine com 8 produtos, selos de "Novo" e "Promoção"
- 📏 Seleção de tamanho (33 a 41) em cada produto
- 🛒 Carrinho funcional: adicionar, alterar quantidade, remover itens
- 💾 Carrinho salvo no `localStorage` (persiste entre visitas)
- 🚚 Barra de progresso para frete grátis (acima de R$ 99,00)
- ✅ Checkout com validação de formulário e número de pedido
- 🧭 Navbar fixa com link ativo por seção e botão "voltar ao topo"

## Estrutura do projeto

```
├── index.html       # Página inicial (carrossel + vitrine)
├── produto.html     # Detalhe do produto (produto.html?id=p1 ... p8)
├── carrinho.html    # Carrinho de compras
├── checkout.html    # Finalização da compra
├── styles.css       # Folha de estilos (tema rosa, cards, responsividade)
├── script.js        # Núcleo compartilhado + API do carrinho
├── catalogo.js      # Catálogo de produtos (fonte única de dados)
├── produto.js       # Renderização da página de produto + tamanhos
├── carrinho.js      # Lógica da página do carrinho
├── checkout.js      # Lógica do checkout
├── Imagem_1.jpeg    # Foto do produto 1
└── Imagem_2.jpeg    # Foto do produto 2
```

## Como executar

Basta abrir o arquivo `index.html` em qualquer navegador moderno.

Opcionalmente, sirva via servidor local:

```bash
python -m http.server 8000
```

e acesse `http://localhost:8000`.

## Tecnologias

- HTML5
- CSS3 (variáveis customizadas)
- JavaScript (ES6+, sem frameworks)
- [Bootstrap 5.3](https://getbootstrap.com/) via CDN
