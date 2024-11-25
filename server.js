const express = require('express');
const venom = require('venom-bot');

const app = express();
app.use(express.json());
const port = 3000;

// Inicializa o Venom Bot
venom
  .create({
    session: 'bot-session', // Nome da sessão
  })
  .then((client) => start(client))
  .catch((err) => {
    console.error('Erro ao iniciar o Venom Bot:', err);
  });

function start(client) {
  // Endpoint para envio de mensagens
  app.post('/send-message', async (req, res) => {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: 'Parâmetros "to" e "message" são obrigatórios.' });
    }

    try {
      await client.sendText(`${to}@c.us`, message);
      res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      res.status(500).json({ success: false, error: 'Erro ao enviar mensagem.' });
    }
  });
}

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
