/* ============================================
   SHE CHINELOS - Script da página do carrinho
   ============================================ */

const FRETE = 14.90;
const FRETE_GRATIS_ACIMA = 99;

document.addEventListener('DOMContentLoaded', function () {
    renderizarCarrinho();
});

function renderizarCarrinho() {
    const itens = Carrinho.obter();
    const vazio = document.getElementById('carrinho-vazio');
    const conteudo = document.getElementById('carrinho-conteudo');

    if (!itens.length) {
        vazio.classList.remove('d-none');
        conteudo.classList.add('d-none');
        return;
    }

    vazio.classList.add('d-none');
    conteudo.classList.remove('d-none');

    renderizarLista(itens);
    renderizarResumo();
}

function renderizarLista(itens) {
    const lista = document.getElementById('lista-carrinho');

    lista.innerHTML = itens
        .map(function (item) {
            const produto = buscarProduto(item.id);
            const imagem = produto ? produto.imagem : '';
            const subtotal = item.preco * item.qtd;

            return (
                '<tr>' +
                '<td><div class="d-flex align-items-center gap-3">' +
                '<img src="' + imagem + '" class="item-carrinho-img" alt="' + item.nome + '">' +
                '<a href="produto.html?id=' + item.id + '" class="link-produto fw-semibold">' + item.nome + '</a>' +
                '</div></td>' +
                '<td><span class="badge bg-secondary">' + (item.tamanho ?? 'Único') + '</span></td>' +
                '<td><div class="stepper justify-content-center">' +
                '<button type="button" data-acao="diminuir" data-id="' + item.id + '" data-tamanho="' + item.tamanho + '" aria-label="Diminuir quantidade">−</button>' +
                '<input type="number" class="input-qtd" min="1" value="' + item.qtd + '" data-id="' + item.id + '" data-tamanho="' + item.tamanho + '" aria-label="Quantidade">' +
                '<button type="button" data-acao="aumentar" data-id="' + item.id + '" data-tamanho="' + item.tamanho + '" aria-label="Aumentar quantidade">+</button>' +
                '</div></td>' +
                '<td class="text-end fw-bold">' + formatarPreco(subtotal) + '</td>' +
                '<td class="text-end">' +
                '<button type="button" class="link-remover" data-acao="remover" data-id="' + item.id + '" data-tamanho="' + item.tamanho + '" title="Remover item">🗑️</button>' +
                '</td>' +
                '</tr>'
            );
        })
        .join('');
}

function renderizarResumo() {
    const subtotal = Carrinho.total();
    const frete = subtotal >= FRETE_GRATIS_ACIMA ? 0 : FRETE;
    const total = subtotal + frete;

    document.getElementById('resumo-subtotal').textContent = formatarPreco(subtotal);
    document.getElementById('resumo-frete').textContent =
        frete === 0 ? 'Grátis 🎉' : formatarPreco(frete);
    document.getElementById('resumo-total').textContent = formatarPreco(total);

    const progresso = Math.min(100, (subtotal / FRETE_GRATIS_ACIMA) * 100);
    document.getElementById('progresso-frete').style.width = progresso + '%';

    const mensagem = document.getElementById('mensagem-frete');
    if (frete === 0) {
        mensagem.textContent = 'Parabéns! Você ganhou frete grátis. 🎉';
    } else {
        mensagem.textContent =
            'Faltam ' +
            formatarPreco(FRETE_GRATIS_ACIMA - subtotal) +
            ' para você ganhar frete grátis!';
    }
}

/* Ações da tabela: +/- quantidade e remover */
document.addEventListener('click', function (evento) {
    const botao = evento.target.closest('[data-acao]');
    if (!botao) return;

    const acao = botao.dataset.acao;
    const id = botao.dataset.id;
    const tamanho = botao.dataset.tamanho === 'null' ? null : parseInt(botao.dataset.tamanho, 10);

    if (acao === 'aumentar') {
        Carrinho.alterarQuantidade(id, tamanho, 1);
    } else if (acao === 'diminuir') {
        Carrinho.alterarQuantidade(id, tamanho, -1);
    } else if (acao === 'remover') {
        Carrinho.remover(id, tamanho);
        mostrarToast('Item removido do carrinho.');
    } else {
        return;
    }

    atualizarBadge(document.getElementById('contador-carrinho'), Carrinho.contar());
    renderizarCarrinho();
});

/* Digitação direta da quantidade */
document.addEventListener('change', function (evento) {
    const input = evento.target.closest('.input-qtd');
    if (!input) return;

    const id = input.dataset.id;
    const tamanho = input.dataset.tamanho === 'null' ? null : parseInt(input.dataset.tamanho, 10);
    const novaQtd = parseInt(input.value, 10);

    /* Valor inválido: apenas re-renderiza para restaurar a quantidade salva */
    if (!novaQtd || novaQtd < 1) {
        renderizarCarrinho();
        return;
    }

    Carrinho.definirQuantidade(id, tamanho, novaQtd);
    atualizarBadge(document.getElementById('contador-carrinho'), Carrinho.contar());
    renderizarCarrinho();
});
