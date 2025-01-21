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

// Função para abrir o modal
function openModal() {
    modalOverlay.classList.add('active');
}

// Função para fechar o modal
function closeModal() {
    modalOverlay.classList.remove('active');
}

// Adiciona evento para abrir o modal
openModalButtons.forEach(button => {
    button.addEventListener('click', openModal);
});

// Fecha o modal ao clicar no botão de fechar
closeModalButton.addEventListener('click', closeModal);

// Fecha o modal ao clicar na overlay
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

// Seleciona os botões para abrir os modais
const openLiteButton = document.querySelector('.openModalLite');
const openPlusButton = document.querySelector('.openModalPlus');
const openPersonButton = document.querySelector('.openModalPerson');

// Seleciona os modais pelo ID
const modalLite = document.getElementById('modalLite');
const modalPlus = document.getElementById('modalPlus');
const modalPerson = document.getElementById('modalPerson');

// Adiciona eventos para abrir os modais correspondentes
openLiteButton.addEventListener('click', () => {
    modalLite.classList.add('active');
});
openPlusButton.addEventListener('click', () => {
    modalPlus.classList.add('active');
});
openPersonButton.addEventListener('click', () => {
    modalPerson.classList.add('active');
});

// Fecha os modais ao clicar no botão de fechar ou fora do modal
document.querySelectorAll('.modal-overlay').forEach(modal => {
    const closeButton = modal.querySelector('.close-modal');
    
    // Fecha ao clicar no botão de fechar
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Fecha ao clicar fora do modal
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
});
