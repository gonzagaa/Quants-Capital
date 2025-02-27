require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 Configuração de CORS mais flexível
app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Conversões do Facebook rodando!');
});

// Rota para enviar eventos ao Facebook
app.post('/send-event', async (req, res) => {
    try {
        const { event_name, event_time, user_data } = req.body;

        // 🔥 Melhorando a correspondência do evento
        const eventData = {
            data: [
                {
                    event_name,
                    event_time,
                    user_data: {
                        client_ip_address: req.ip, // Captura o IP do usuário
                        client_user_agent: req.headers['user-agent'], // Captura o User-Agent
                        external_id: req.ip.replace(/\./g, '') + '-' + Date.now(), // ID único baseado no IP e tempo
                        fbc: user_data.fbc || null, // 🔥 Capturando o Facebook Click ID (fbc)
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
