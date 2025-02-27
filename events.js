document.addEventListener("DOMContentLoaded", () => {
    let selectedPlan = null;

    // Função para capturar o Facebook Click ID (fbc) do cookie
    function getFacebookClickId() {
        let fbc = "";
        const match = document.cookie.match(/_fbc=([^;]+)/);
        if (match) {
            fbc = match[1];
        }
        return fbc;
    }

    // Função para enviar eventos ao backend
    function sendEvent(eventName, userData = {}) {
        const fbc = getFacebookClickId(); // Captura o fbc

        fetch("https://quants-capital.vercel.app/send-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event_name: eventName,
                event_time: Math.floor(Date.now() / 1000),
                user_data: {
                    ...userData,
                    fbc: fbc || null // 🔥 Adicionando fbc ao evento
                }
            })
        }).then(response => response.json())
          .then(data => console.log("Evento enviado:", data))
          .catch(error => console.error("Erro ao enviar evento:", error));
    }

    // Captura o clique nos botões de abrir o formulário
    document.querySelectorAll(".openModalForm").forEach(button => {
        button.addEventListener("click", (event) => {
            selectedPlan = event.target.getAttribute("data-plan");
            console.log("Plano selecionado:", selectedPlan);
            if (selectedPlan === "plus") {
                sendEvent("Abriu formulário do plano Plus");
            } else if (selectedPlan === "person") {
                sendEvent("Abriu formulário do plano Person");
            }
        });
    });

    // Captura o clique no botão de fechar o formulário
    const closeModal = document.getElementById("closeModal");
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            sendEvent("Fechou formulário sem enviar os dados");
        });
    }

    // Captura o envio do formulário RD Station
    document.addEventListener("submit", function (event) {
        const form = event.target;
        
        // Verifica se o formulário pertence ao RD Station
        if (form.closest("#quants-prepopulado-6fafab484f5fa0d4b38b")) {
            console.log("Formulário RD enviado!");

            if (selectedPlan) {
                sendEvent(`Enviou formulário do plano ${selectedPlan.toUpperCase()}`);
                selectedPlan = null; // Resetar após envio
            }
        }
    }, true); // Usa `true` para capturar o evento na fase de captura
});
