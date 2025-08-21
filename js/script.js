/**
 * Documentação JavaScript
 * Autor: Emanoel tech(janio emanoel)
 * Projeto: GD Moto Peças (Versão com Carrossel e Melhorias de UX)
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
        duration: 800,      // Duração da animação em milissegundos
        easing: 'ease-in-out', // Tipo de "aceleração" da animação
        once: false,           // A animação acontece apenas uma vez se estiver como "true"
        offset: 100          // Ponto de gatilho da animação em relação à tela
    });

    // --- INICIALIZAÇÃO DO "carrosel" DE MARCAS ---
    const marcasSwiper = new Swiper('.marcas-swiper', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30, // Espaço entre os logos
        autoplay: {
            delay: 2222,
            disableOnInteraction: false,
        },
    });

    // --- FECHAR MENU MOBILE AO CLICAR NO LINK ---
    // Seleciona todos os links que estão dentro do menu de navegação
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    // Seleciona o elemento do menu que é "colapsável"
    const menuToggle = document.getElementById('navbarNav');
    // Cria uma instância do objeto Collapse do Bootstrap para que possamos controlá-lo
    const bsCollapse = new bootstrap.Collapse(menuToggle, {
        toggle: false
    });

    // Para cada link do menu, nós adicionamos um "ouvinte de evento de clique"
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Se o menu estiver visível (o Bootstrap adiciona a classe 'show')...
            if (menuToggle.classList.contains('show')) {
                // ...nós usamos o nosso controlador (bsCollapse) para acionar a função .hide().
                bsCollapse.hide();
            }
        });
    });

    // --- LÓGICA DO FORMULÁRIO DE ORÇAMENTO VIA WHATSAPP ---
    const btnWhatsapp = document.getElementById('btn-orcamento-whatsapp');

    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', function() {
            //  Coletamos os dados de cada campo do formulário pelos seus IDs
            const nome = document.getElementById('orcamento-nome').value;
            const filialSelect = document.getElementById('orcamento-filial');
            const filialNumero = filialSelect.value;
            const moto = document.getElementById('orcamento-moto').value;
            const descricao = document.getElementById('orcamento-descricao').value;

            //  Fazemos uma validação simples para os campos obrigatórios
            if (!nome || !filialNumero || !descricao) {
                alert('Por favor, preencha seu nome, selecione uma filial e descreva o que precisa.');
                return; // Para a execução da função se algo estiver faltando
            }

            //  Verificamos a hora atual para definir a saudação (usa o horário do dispositivo do cliente)
            const horaAtual = new Date().getHours();
            const saudacao = horaAtual >= 12 ? 'Olá, boa tarde' : 'Olá, bom dia';
            
            //  Montamos a mensagem no padrão que você pediu
            // A sintaxe *texto* deixa o texto em negrito no WhatsApp
            let mensagem = `${saudacao}.\n\n`; // \n cria uma quebra de linha
            mensagem += `Meu nome é: *${nome}*\n`;
            
            // Só adicionamos a linha da moto se o campo foi preenchido
            if (moto) {
                mensagem += `Moto: *${moto}*\n`;
            }
            mensagem += `Descrição: *${descricao}*`;
            
            //  Codificamos a mensagem para que ela funcione corretamente em uma URL
            const mensagemCodificada = encodeURIComponent(mensagem);
            
            //  Criamos o link final e abrimos o WhatsApp em uma nova aba
            const linkWhatsapp = `https://wa.me/${filialNumero}?text=${mensagemCodificada}`;
            
            window.open(linkWhatsapp, '_blank');
        });
    }


});