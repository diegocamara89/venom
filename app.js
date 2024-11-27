const express = require('express');
const venom = require('venom-bot');

const app = express();
app.use(express.json());
const port = 3000;

venom.create({
  session: 'apizap',
  multidevice: true, // Para suportar múltiplos dispositivos
  folderNameToken: 'tokens', // Nome do diretório para armazenar tokens
  mkdirFolderToken: './sessions', // Caminho do diretório para armazenar arquivos de sessão
})
.then((client) => start(client))
.catch((err) => {
  console.log('Erro ao iniciar o Venom:', err);
});

const start = (client) => {
  // Endpoint para envio de mensagem
  app.post('/send-message', async (req, res) => {
    const { to, message } = req.body;
    try {
      await client.sendText(`${to}@c.us`, message);
      res.json({ status: 'success', message: 'Mensagem enviada!' });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.toString() });
    }
  });

  // Endpoint básico para verificar se o servidor está rodando
  app.get('/', (req, res) => {
    res.send('Servidor rodando!');
  });
};

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
