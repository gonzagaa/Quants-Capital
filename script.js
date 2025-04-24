window.addEventListener('scroll', onScroll)

onScroll()
function onScroll() {
    showNavOnScroll()
}

function showNavOnScroll() {
    if(scrollY > 0) {
        document.querySelector("#navigation").classList.add("scroll")
    } else {
        document.querySelector("#navigation").classList.remove("scroll")
    }
}

function openMenu() {
    document.body.classList.add('menu-expanded')
}

function closeMenu() {
    document.body.classList.remove('menu-expanded')
}


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

// Seleciona os novos botões para abrir o modal
const openModalButtons = document.querySelectorAll('.openModalForm');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalButton = document.getElementById('closeModal');

// Variável para armazenar a origem do modal (WhatsApp ou Obrigado)
let redirectType = null;

// Função para abrir o modal e definir o tipo de redirecionamento
function openModal(event) {
    modalOverlay.classList.add('active');

    // Verifica qual botão foi clicado e define o tipo de redirecionamento
    if (event.target.closest('.btn-whatsapp-pulse')) {
        redirectType = 'whatsapp';
    } else {
        redirectType = 'obrigado';
    }
}

// Função para fechar o modal
function closeModal() {
    modalOverlay.classList.remove('active');
    redirectType = null; // Reseta a variável
}

// Adiciona evento para abrir o modal nos novos botões
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

// Usar MutationObserver para detectar quando o botão de envio do formulário for renderizado
const observer = new MutationObserver((mutationsList, observer) => {
    const formButton = document.getElementById('rd-button-m66rvitk'); // Substitua pelo ID correto

    if (formButton) {
        console.log('Botão do formulário detectado!');

        // Captura o formulário
        const formElement = document.querySelector('#quants-prepopulado-6fafab484f5fa0d4b38b form');

        if (!formElement) {
            console.error('Formulário não encontrado!');
            return;
        }

        // Adiciona um evento para capturar o envio do formulário
        formElement.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão para evitar comportamentos inesperados

            // Verifica se o formulário está válido antes de redirecionar
            if (formElement.checkValidity()) {
                let redirectLink;

                // Define o link de redirecionamento com base no botão que abriu o modal
                if (redirectType === 'whatsapp') {
                    redirectLink = 'https://wa.link/d0axsx';
                } else {
                    redirectLink = 'https://lp.quantscapital.com.br/obrigado-contato';
                }

                // Aguarda um pequeno tempo antes de redirecionar para garantir que o envio foi processado
                setTimeout(() => {
                    window.location.href = redirectLink;
                }, 500); // Pequeno delay para garantir que o envio foi registrado
            } else {
                // Se o formulário não estiver válido, exibe mensagens de erro
                formElement.reportValidity();
            }
        });

        // Parar de observar após encontrar o botão e configurar o evento
        observer.disconnect();
        console.log('Evento de envio configurado para redirecionamento.');
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

// // Ajuste para data-alvo 05/03/2025:
// const targetDate = new Date("2025-03-06T00:00:00");

// // Atualiza o timer a cada segundo
// const timerInterval = setInterval(updateCountdown, 1000);
// updateCountdown(); // Atualiza ao carregar a página

// function updateCountdown() {
//   const now = new Date().getTime();
//   const distance = targetDate - now;

//   if (distance < 0) {
//     document.getElementById("countdown").innerHTML = "Tempo esgotado!";
//     clearInterval(timerInterval);
//     return;
//   }

//   // Cálculos de dias, horas, minutos, segundos
//   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Cria 4 "caixas", cada uma com número + unidade
//   const countdownHTML = `
//     <div class="time-container">
//       <div class="time-box">
//         <span class="count-number">${days}</span>
//         <span class="count-unit">d</span>
//       </div>
//       <div class="time-box">
//         <span class="count-number">${hours}</span>
//         <span class="count-unit">h</span>
//       </div>
//       <div class="time-box">
//         <span class="count-number">${minutes}</span>
//         <span class="count-unit">m</span>
//       </div>
//       <div class="time-box">
//         <span class="count-number">${seconds}</span>
//         <span class="count-unit">s</span>
//       </div>
//     </div>
//   `;

//   // Insere na tela
//   document.getElementById("countdown").innerHTML = countdownHTML;
// }




