document.addEventListener("DOMContentLoaded", () => {
    let formOpened = false; // Para identificar se o formulário foi aberto

    // Função para gerar um ID único para cada evento (para desduplicação)
    function generateEventId() {
        return 'event-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    // Função para capturar o Facebook Click ID (fbc) do cookie
    function getFacebookClickId() {
        let fbc = "";
        const match = document.cookie.match(/_fbc=([^;]+)/);
        if (match) {
            fbc = match[1];
        }
        return fbc;
    }

    // Função para enviar eventos ao Facebook Pixel (Navegador)
    function sendPixelEvent(eventName, eventId) {
        if (typeof fbq !== "undefined") {
            fbq("track", eventName, {}, { eventID: eventId });
            console.log(`Evento enviado via Pixel: ${eventName} | eventID: ${eventId}`);
        }
    }

    // Função para enviar eventos ao backend (API de Conversões)
    function sendEvent(eventName, userData = {}) {
        const eventId = generateEventId(); // Gerar um event_id único
        const fbc = getFacebookClickId(); // Captura o fbc

        // Envia pelo Pixel (Navegador)
        sendPixelEvent(eventName, eventId);

        // Envia pela API de Conversões (Backend)
        fetch("https://quants-capital.vercel.app/send-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event_name: eventName,
                event_time: Math.floor(Date.now() / 1000),
                event_id: eventId, // 🔥 ID do evento para desduplicação
                user_data: {
                    ...userData,
                    fbc: fbc || null // 🔥 Adicionando fbc ao evento
                }
            })
        }).then(response => response.json())
          .then(data => console.log("Evento enviado via API:", data))
          .catch(error => console.error("Erro ao enviar evento:", error));
    }

    // Captura o clique nos botões de checkout dos planos
    document.querySelectorAll(".openCheckout").forEach(button => {
        button.addEventListener("click", (event) => {
            const plan = event.target.getAttribute("data-plan");
            if (plan === "plus") {
                sendEvent("Redirecionado pro checkout do plano Plus");
            } else if (plan === "person") {
                sendEvent("Redirecionado pro checkout do plano Person");
            }
        });
    });

    // Captura o clique em qualquer botão que abre o formulário de contato
    document.querySelectorAll(".openModalForm, .btn-whatsapp-pulse").forEach(button => {
        button.addEventListener("click", () => {
            formOpened = true; // Define que o formulário foi aberto
            sendEvent("Abriu formulário de contato");
        });
    });

    // Captura o envio do formulário RD Station
    document.addEventListener("submit", function (event) {
        const form = event.target;
        
        // Verifica se o formulário pertence ao RD Station
        if (form.closest("#quants-prepopulado-6fafab484f5fa0d4b38b") && formOpened) {
            console.log("Formulário de contato enviado!");
            sendEvent("Enviou formulário de contato");
            formOpened = false; // Resetar após envio
        }
    }, true); // Usa `true` para capturar o evento na fase de captura
});
