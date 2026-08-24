/* ============================================
   SHE CHINELOS - Script principal
   Compartilhado por todas as páginas
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initNavbarScroll();
    initNavLinkAtivo();
    initBotaoTopo();
    initCarrinho();
});

/* ---------- API global do carrinho ----------
   Usada pelo script principal, carrinho.html e checkout.html */
const Carrinho = {
    CHAVE: 'carrinhoItens',

    obter: function () {
        try {
            const itens = JSON.parse(localStorage.getItem(this.CHAVE)) || [];
            return itens.map(function (i) {
                return Object.assign({ qtd: 1 }, i);
            });
        } catch {
            return [];
        }
    },

    salvar: function (itens) {
        localStorage.setItem(this.CHAVE, JSON.stringify(itens));
    },

    adicionar: function (item) {
        const itens = this.obter();
        const existente = itens.find(function (i) {
            return i.id === item.id && i.tamanho === item.tamanho;
        });

        if (existente) {
            existente.qtd += item.qtd || 1;
        } else {
            itens.push(Object.assign({ qtd: 1 }, item));
        }

        this.salvar(itens);
    },

    alterarQuantidade: function (id, tamanho, delta) {
        const itens = this.obter();
        const item = itens.find(function (i) {
            return i.id === id && i.tamanho === tamanho;
        });

        if (!item) return;

        item.qtd = Math.max(1, item.qtd + delta);
        this.salvar(itens);
    },

    remover: function (id, tamanho) {
        this.salvar(
            this.obter().filter(function (i) {
                return !(i.id === id && i.tamanho === tamanho);
            })
        );
    },

    limpar: function () {
        this.salvar([]);
    },

    contar: function () {
        return this.obter().reduce(function (soma, i) {
            return soma + i.qtd;
        }, 0);
    },

    total: function () {
        return this.obter().reduce(function (soma, i) {
            return soma + i.preco * i.qtd;
        }, 0);
    }
};

/* ---------- Navbar: sombra ao rolar a página ---------- */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        navbar.classList.toggle('sombra', window.scrollY > 10);
    });
}

/* ---------- Navbar: destaca o link da seção visível ---------- */
function initNavLinkAtivo() {
    const secoes = document.querySelectorAll('section[id], footer[id]');
    const links = document.querySelectorAll('.navbar .nav-link');

    window.addEventListener('scroll', function () {
        let idAtual = '';

        secoes.forEach(function (secao) {
            if (window.scrollY >= secao.offsetTop - 120) {
                idAtual = secao.getAttribute('id');
            }
        });

        links.forEach(function (link) {
            link.classList.toggle(
                'ativo',
                link.getAttribute('href') === '#' + idAtual
            );
        });
    });
}

/* ---------- Botão "voltar ao topo" ---------- */
function initBotaoTopo() {
    const botao = document.querySelector('.btn-topo');
    if (!botao) return;

    window.addEventListener('scroll', function () {
        botao.classList.toggle('visivel', window.scrollY > 300);
    });

    botao.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---------- Carrinho: badge + botões "adicionar" ---------- */
function initCarrinho() {
    const badge = document.getElementById('contador-carrinho');
    atualizarBadge(badge, Carrinho.contar());

    document.querySelectorAll('.btn-adicionar').forEach(function (botao) {
        botao.addEventListener('click', function (evento) {
            evento.preventDefault();

            // Em páginas com seletor de tamanhos, exige tamanho escolhido
            const selecionado = document.querySelector('.btn-tamanho.selecionado');
            const paginaComTamanhos = document.querySelector('.btn-tamanho');

            if (paginaComTamanhos && !selecionado) {
                const aviso = document.getElementById('aviso-tamanho');
                if (aviso) aviso.classList.add('visivel');
                paginaComTamanhos.focus();
                return;
            }

            Carrinho.adicionar({
                id: botao.dataset.id,
                nome: botao.dataset.nome,
                preco: parseFloat(botao.dataset.preco),
                tamanho: selecionado ? parseInt(selecionado.dataset.tamanho, 10) : null
            });

            atualizarBadge(badge, Carrinho.contar());
            animarBadge(badge);
            mostrarToast();
        });
    });
}

function atualizarBadge(badge, qtd) {
    if (!badge) return;
    badge.textContent = qtd;
    badge.style.display = qtd > 0 ? '' : 'none';
}

function animarBadge(badge) {
    if (!badge) return;
    badge.classList.remove('badge-pulso');
    void badge.offsetWidth; // reinicia a animação
    badge.classList.add('badge-pulso');
    badge.addEventListener('animationend', function () {
        badge.classList.remove('badge-pulso');
    }, { once: true });
}

/* ---------- Toast de feedback ---------- */
function mostrarToast(mensagem) {
    const elemento = document.getElementById('toast-carrinho');
    if (!elemento || typeof bootstrap === 'undefined') return;

    if (mensagem) {
        elemento.querySelector('.toast-body').textContent = mensagem;
    }

    bootstrap.Toast.getOrCreateInstance(elemento).show();
}
