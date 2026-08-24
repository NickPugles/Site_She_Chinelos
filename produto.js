/* ============================================
   SHE CHINELOS - Script da página de produto
   Renderiza o produto (produto.html?id=pN)
   e controla a seleção de tamanho (33 ao 41)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const produto = buscarProduto(params.get('id')) || CATALOGO[0];

    renderizarProduto(produto);
    initSelecaoTamanho();
});

function renderizarProduto(p) {
    document.title = p.nome + ' | She Chinelos';

    const set = function (id, valor) {
        const el = document.getElementById(id);
        if (el) el.textContent = valor;
    };

    set('produto-breadcrumb', p.nome);
    set('produto-nome', p.nome);
    set('produto-descricao', p.descricaoLonga);

    const tag = document.getElementById('produto-tag');
    if (tag) {
        tag.textContent = p.tag || '';
        tag.style.display = p.tag ? '' : 'none';
    }

    set('produto-preco', formatarPreco(p.preco));

    const antigo = document.getElementById('produto-preco-antigo');
    if (antigo) {
        antigo.textContent = formatarPreco(p.precoAntigo);
        antigo.style.display = p.precoAntigo ? '' : 'none';
    }

    const img = document.getElementById('produto-imagem');
    if (img) {
        img.src = p.imagem;
        img.alt = p.nome;
    }

    // Botão adicionar recebe os dados do produto atual
    const botao = document.querySelector('.btn-adicionar');
    if (botao) {
        botao.dataset.id = p.id;
        botao.dataset.nome = p.nome;
        botao.dataset.preco = p.preco.toFixed(2);
    }
}

function initSelecaoTamanho() {
    const container = document.getElementById('tamanhos');
    if (!container) return;

    // Gera os botões de tamanho (33 ao 41)
    TAMANHOS.forEach(function (tamanho) {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'btn-tamanho';
        botao.dataset.tamanho = tamanho;
        botao.setAttribute('aria-pressed', 'false');
        botao.textContent = tamanho;
        container.appendChild(botao);
    });

    const aviso = document.getElementById('aviso-tamanho');

    container.addEventListener('click', function (evento) {
        const botao = evento.target.closest('.btn-tamanho');
        if (!botao) return;

        container.querySelectorAll('.btn-tamanho').forEach(function (b) {
            b.classList.remove('selecionado');
            b.setAttribute('aria-pressed', 'false');
        });

        botao.classList.add('selecionado');
        botao.setAttribute('aria-pressed', 'true');

        if (aviso) aviso.classList.remove('visivel');
    });
}
