const larguraDaTela = window.innerWidth

if (larguraDaTela < 800) {
  var swiper4 = new Swiper(".mySwiper4", {
    cssMode: true,
    spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
      mousewheel: true,
      keyboard: true,
      loop: true,
  });
} else {
  // Remove as classes do carrossel para desktop
  document.querySelectorAll('.swiper, .mySwiper4').forEach(el => {
    el.classList.remove('swiper', 'mySwiper4');
  });

  document.querySelectorAll('.swiper-wrapper').forEach(el => {
    el.classList.remove('swiper-wrapper');
  });

  document.querySelectorAll('.swiper-slide').forEach(el => {
    el.classList.remove('swiper-slide');
  });
}

// Seleciona os elementos
const openModalButtons = document.querySelectorAll('.openModalForm');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalButton = document.getElementById('closeModal');

// Variável para armazenar o plano atual
let currentPlan = null;

// Função para abrir o modal e identificar o plano
function openModal(event) {
    modalOverlay.classList.add('active');

    // Identifica o plano a partir do botão clicado
    currentPlan = event.target.getAttribute('data-plan');
}

// Função para fechar o modal
function closeModal() {
    modalOverlay.classList.remove('active');
    currentPlan = null; // Reseta o plano
}

// Adiciona evento para abrir o modal
openModalButtons.forEach(button => {
    button.addEventListener('click', openModal);
});

// Fecha o modal ao clicar no botão de fechar
if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

// Fecha o modal ao clicar na overlay
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

// Usar MutationObserver para detectar quando o botão for renderizado
const observer = new MutationObserver((mutationsList, observer) => {
  const formButton = document.getElementById('rd-button-m66rvitk'); // Substitua pelo ID correto

  if (formButton) {
      // Adicionar a classe "link4Selet"
      formButton.classList.add('link4Selet');
      console.log('Classe "link4Selet" adicionada ao botão!');

      // Adicionar o evento de clique para redirecionamento
      formButton.addEventListener('click', () => {
          let checkoutLink;

          // Define o link do checkout com base no plano
          if (currentPlan === 'lite') {
              checkoutLink = 'https://app.4selet.com.br/checkout/d68c9ea4-77bd-4a6b-bc4d-f14eecf1e8b3';
          } else if (currentPlan === 'plus') {
              checkoutLink = 'https://app.4selet.com.br/checkout/b9df07e0-02f3-424a-b391-239dc7f94d62';
          } else if (currentPlan === 'person') {
              checkoutLink = 'https://app.4selet.com.br/checkout/6ba34969-df8d-4e98-a054-426bf3898eb4';
          }

          // Redireciona para o link do checkout
          if (checkoutLink) {
              window.location.href = checkoutLink;
          }
      });

      // Parar de observar após encontrar o botão
      observer.disconnect();
      console.log('Botão do formulário encontrado, classe adicionada e evento configurado!');
  }
});

// Configurar o observer para monitorar o documento
observer.observe(document.body, {
  childList: true,
  subtree: true,
});



