/**
 * Documentação JavaScript
 * Autor: Emanoel tech(janio emanoel)
 * Projeto: GD Moto Peças (Versão  com todas as funcionalidades)
 */

document.addEventListener('DOMContentLoaded', function() {

    // --- EFEITO DO CABEÇALHO AO ROLAR ---
    const header = document.getElementById('main-header');
    if (header) {
        function handleHeaderScroll() {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', handleHeaderScroll);
    }

    // --- INICIALIZAÇÃO DA BIBLIOTECA DE ANIMAÇÃO (AOS) ---
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        offset: 100
    });

// --- INICIALIZAÇÃO DO CARROSSEL DE MARCAS ---
const marcasSwiper = new Swiper('.marcas-swiper', {
    loop: true,
    spaceBetween: 30,
    autoplay: {
        delay: 2222,
        disableOnInteraction: false,
    },
    //  a configuração responsiva
    breakpoints: {
        // Para telas de celular (a partir de 320px de largura)
        320: {
            slidesPerView: 3,
            centeredSlides: true, // Centraliza o logo do meio, fica ótimo no mobile
        },
        // Para telas de tablet (a partir de 768px de largura)
        768: {
            slidesPerView: 4,
            centeredSlides: false, // Com mais itens, não precisamos mais centralizar
        },
        // Para telas de desktop (a partir de 992px de largura)
        992: {
            slidesPerView: 5, // Exibe 5 logos, preenchendo o espaço
            centeredSlides: false,
        }
    }
});

    // --- LÓGICA PARA CARREGAR E EXIBIR DEPOIMENTOS DINAMICAMENTE ---
    async function carregarDepoimentos() {
        const swiperContainer = document.querySelector('.depoimentos-swiper');
        const swiperWrapper = swiperContainer?.querySelector('.swiper-wrapper');
        
        // Se o elemento do carrossel não existir na página, não faz nada.
        if (!swiperContainer || !swiperWrapper) return;

        try {
            // 1. Busca os dados do arquivo JSON.
            const response = await fetch('depoimentos.json');
            const depoimentos = await response.json();

            // 2. Cria o HTML para cada depoimento e o insere no carrossel.
            let slidesHTML = '';
            depoimentos.forEach(depoimento => {
                slidesHTML += `
                    <div class="swiper-slide">
                        <div class="card testimonial-card h-100">
                            <div class="card-body">
                                <p class="card-text">"${depoimento.texto}"</p>
                            </div>
                            <div class="card-footer">
                                <span>${depoimento.nome}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            // Duplicamos os slides para garantir que o loop infinito da animação fique perfeito
            swiperWrapper.innerHTML = slidesHTML + slidesHTML;

            // 3. Inicializa o Swiper DEPOIS que os slides foram adicionados, com a configuração de animação.
            const depoimentosSwiper = new Swiper(swiperContainer, {
                loop: true,
                slidesPerView: 'auto',
                spaceBetween: 30,
                freeMode: true,
                speed: 8000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
            });

            // 4. Adiciona a funcionalidade de pausar com o mouse ou dedo.
            swiperContainer.addEventListener('mouseenter', () => depoimentosSwiper.autoplay.stop());
            swiperContainer.addEventListener('mouseleave', () => depoimentosSwiper.autoplay.start());
            swiperContainer.addEventListener('touchstart', () => depoimentosSwiper.autoplay.stop());
            swiperContainer.addEventListener('touchend', () => depoimentosSwiper.autoplay.start());

        } catch (error) {
            console.error('Erro ao carregar os depoimentos:', error);
            swiperWrapper.innerHTML = '<p class="text-center text-white">Não foi possível carregar os depoimentos no momento.</p>';
        }
    }

    // Chama a função para iniciar o processo de carregamento dos depoimentos
    carregarDepoimentos();

    // --- LÓGICA DO FORMULÁRIO DE ORÇAMENTO VIA WHATSAPP ---
    const btnWhatsapp = document.getElementById('btn-orcamento-whatsapp');
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', function() {
            const nome = document.getElementById('orcamento-nome').value;
            const filialSelect = document.getElementById('orcamento-filial');
            const filialNumero = filialSelect.value;
            const moto = document.getElementById('orcamento-moto').value;
            const descricao = document.getElementById('orcamento-descricao').value;

            if (!nome || !filialNumero || !descricao) {
                alert('Por favor, preencha seu nome, selecione uma filial e descreva o que precisa.');
                return;
            }

            const horaAtual = new Date().getHours();
            // A saudação agora usa o fuso horário de Brasília (-3)
            const saudacao = horaAtual >= 12 ? 'Olá, boa tarde' : 'Olá, bom dia';
            
            let mensagem = `${saudacao}.\n\n`;
            mensagem += `Meu nome é: *${nome}*\n`;
            if (moto) {
                mensagem += `Moto: *${moto}*\n`;
            }
            mensagem += `Descrição: *${descricao}*`;
            
            const mensagemCodificada = encodeURIComponent(mensagem);
            const linkWhatsapp = `https://wa.me/${filialNumero}?text=${mensagemCodificada}`;
            
            window.open(linkWhatsapp, '_blank');
        });
    }

    // --- FECHAR MENU MOBILE AO CLICAR NO LINK ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    if (menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {
            toggle: false
        });
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (menuToggle.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }

});