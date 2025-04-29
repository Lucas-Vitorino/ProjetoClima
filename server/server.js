require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');

const apiKey = process.env.API_KEY;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/clima', async (req, res) => {
  const cidade = req.query.cidade;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
