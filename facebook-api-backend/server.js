require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // 🔥 Certifique-se de que esta linha está aqui

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

        const response = await axios.post(`https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events`, {
            data: [
                {
                    event_name,
                    event_time,
                    user_data,
                },
            ],
            access_token: process.env.FB_ACCESS_TOKEN
        });

        res.json({ success: true, response: response.data });
    } catch (error) {
        console.error('Erro ao enviar evento:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
