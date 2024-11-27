const express = require('express');
const venom = require('venom-bot');

const app = express();
app.use(express.json());
const port = 3000;

venom.create({
  session: 'apizap'
})
.then((client) => start(client))
.catch((err) => {
  console.log(err);
});

const start = (client) => {
  app.post('/send-message', async (req, res) => {
    const { to, message } = req.body;
    await client.sendText(to + '@c.us', message);
    res.json('Mensagem enviada');
  });
}

app.listen(port, () => {
  console.log('Srv rodando na porta ' + port);
});
