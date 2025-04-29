const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rota para testar se a API_KEY está sendo lida
app.get('/', (req, res) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(500).send('API_KEY não encontrada! 🚨');
  }

  res.send(`API_KEY encontrada! 🔥 Sua chave é: ${apiKey}`);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor de teste rodando na porta ${PORT}`);
});
