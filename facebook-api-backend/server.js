require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // 🔥 Adicionando suporte ao CORS
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
    console.log(`Servidor rodando na portaa ${PORT}`);
});
