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
        formButton.addEventListener('click', (e) => {
            // Seleciona o formulário inserido pelo RD Station dentro do container
            const formElement = document.querySelector('#quants-prepopulado-6fafab484f5fa0d4b38b form');

            // Verifica se o formulário existe e está válido
            if (formElement && formElement.checkValidity()) {
                let checkoutLink;

                // Define o link do checkout com base no plano
                if (currentPlan === 'lite') {
                    checkoutLink = 'https://app.4selet.com.br/checkout/d68c9ea4-77bd-4a6b-bc4d-f14eecf1e8b3';
                } else if (currentPlan === 'plus') {
                    checkoutLink = 'https://app.4selet.com.br/checkout/b9df07e0-02f3-424a-b391-239dc7f94d62';
                } else if (currentPlan === 'person') {
                    checkoutLink = 'https://app.4selet.com.br/checkout/6ba34969-df8d-4e98-a054-426bf3898eb4';
                }

                // Redireciona para o link do checkout se houver um link definido
                if (checkoutLink) {
                    window.location.href = checkoutLink;
                }
            } else {
                // Se o formulário não for válido, exibe as mensagens de erro
                if (formElement) {
                    formElement.reportValidity();
                }
                // Impede o redirecionamento
                e.preventDefault();
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


document.addEventListener("DOMContentLoaded", () => {
  // Seletores exclusivos para o modal do robô
  const modalOverlayRobo = document.getElementById("modalOverlayRobo");
  const modalRobo = document.getElementById("modalRobo");
  const closeModalButtonRobo = document.getElementById("closeModalRobo");

  const modalTitle = document.getElementById("modalTitle");
  const maxLoss = document.getElementById("maxLoss");
  const taxaAssertividade = document.getElementById("taxaAssertividade");
  const fatorLucro = document.getElementById("fatorLucro");
  const obs = document.getElementById("obs");

  // Botões para abrir o modal do robô
  const openModalButtonsRobo = document.querySelectorAll(".openModalRobo");

  // Carrega o JSON e adiciona eventos aos botões
  fetch("../../robos.json")
    .then((response) => response.json())
    .then((data) => {
      openModalButtonsRobo.forEach((button) => {
        button.addEventListener("click", () => {
          const roboId = button.getAttribute("data-id");
          const robo = data.find((item) => item.id === roboId);

          if (robo) {
            // Preenche os dados do modal
            modalTitle.textContent = robo.nome;
            maxLoss.textContent = robo.maximoLossDiario;
            taxaAssertividade.textContent = robo.taxaAssertividade;
            fatorLucro.textContent = robo.fatorLucro;
            obs.textContent = robo.obs;

            // Abre o modal do robô
            modalOverlayRobo.style.display = "flex";
            setTimeout(() => {
              modalRobo.classList.add("open");
            }, 10);
          }
        });
      });
    })
    .catch((error) => console.error("Erro ao carregar o JSON:", error));

  // Fecha o modal ao clicar no botão de fechar ou na overlay
  closeModalButtonRobo.addEventListener("click", closeModalRobo);
  modalOverlayRobo.addEventListener("click", (e) => {
    if (e.target === modalOverlayRobo) closeModalRobo();
  });

  // Função para fechar o modal do robô
  function closeModalRobo() {
    modalRobo.classList.remove("open");
    setTimeout(() => {
      modalOverlayRobo.style.display = "none";
    }, 300);
  }
});




