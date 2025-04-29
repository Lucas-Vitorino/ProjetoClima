// server/server.js

const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Liberar CORS pra aceitar chamadas do seu frontend
app.use(cors());

// Criar a rota /weather
app.get('/weather', async (req, res) => {

  const city = req.query.city;
  const apiKey = process.env.API_KEY;

  if (!city) {
    return res.status(400).json({ error: 'Parâmetro "city" é obrigatório.' });
  }

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(data.cod).json({ error: data.message });
    }

    res.json({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    });
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
  console.log('API_KEY:', process.env.API_KEY);

});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
