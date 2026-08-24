/* ============================================
   SHE CHINELOS - Script do checkout
   ============================================ */

const FRETE = 14.90;
const FRETE_GRATIS_ACIMA = 99;

document.addEventListener('DOMContentLoaded', function () {
    renderizarResumo();
    initPagamento();
    initFormulario();
});

function renderizarResumo() {
    const itens = Carrinho.obter();
    const lista = document.getElementById('resumo-itens');

    if (!itens.length) {
        document.getElementById('checkout-conteudo').classList.add('d-none');
        document.getElementById('checkout-vazio').classList.remove('d-none');
        return;
    }

    lista.innerHTML = itens
        .map(function (item) {
            return (
                '<div class="d-flex justify-content-between mb-1 small">' +
                '<span>' + item.qtd + 'x ' + item.nome +
                ' <span class="badge bg-secondary">Tam. ' + (item.tamanho ?? 'Único') + '</span></span>' +
                '<span class="fw-semibold">' + formatarPreco(item.preco * item.qtd) + '</span>' +
                '</div>'
            );
        })
        .join('');

    const subtotal = Carrinho.total();
    const frete = subtotal >= FRETE_GRATIS_ACIMA ? 0 : FRETE;

    document.getElementById('resumo-subtotal').textContent = formatarPreco(subtotal);
    document.getElementById('resumo-frete').textContent =
        frete === 0 ? 'Grátis 🎉' : formatarPreco(frete);
    document.getElementById('resumo-total').textContent = formatarPreco(subtotal + frete);
}

function initPagamento() {
    document.querySelectorAll('.pagamento-opcao input[type="radio"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            document.querySelectorAll('.pagamento-opcao').forEach(function (opcao) {
                opcao.classList.remove('selecionada');
            });
            radio.closest('.pagamento-opcao').classList.add('selecionada');
        });
    });
}

function initFormulario() {
    const form = document.getElementById('form-checkout');

    form.addEventListener('submit', function (evento) {
        evento.preventDefault();
        evento.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        finalizarPedido();
    });
}

function finalizarPedido() {
    const numeroPedido = 'SC' + Math.floor(100000 + Math.random() * 900000);

    Carrinho.limpar();
    atualizarBadge(document.getElementById('contador-carrinho'), 0);

    document.getElementById('checkout-conteudo').classList.add('d-none');
    document.getElementById('pedido-sucesso').classList.remove('d-none');
    document.getElementById('numero-pedido').textContent = numeroPedido;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
