require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Conversões do Facebook rodando!');
});

// Rota para enviar eventos ao Facebook
app.post('/send-event', async (req, res) => {
    try {
        const { event_name, event_time, event_id, user_data = {} } = req.body;

        // 🔥 Melhorando a correspondência dos eventos
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || null;
        const userAgent = req.headers['user-agent'] || null;

        const eventData = {
            data: [
                {
                    event_name,
                    event_time,
                    event_id, // 🔥 ID do evento para desduplicação
                    user_data: {
                        client_ip_address: ip, // Captura corretamente o IP do usuário
                        client_user_agent: userAgent, // Captura corretamente o User-Agent
                        external_id: ip ? ip.replace(/\./g, '') + '-' + Date.now() : null, // ID único baseado no IP e tempo
                        fbc: user_data.fbc || null, // Facebook Click ID (se disponível)
                        ...user_data // Mantém outros dados enviados (se houver)
                    },
                },
            ],
            access_token: process.env.FB_ACCESS_TOKEN
        };

        const response = await axios.post(`https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events`, eventData);

        res.json({ success: true, response: response.data });
    } catch (error) {
        console.error('Erro ao enviar evento:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
