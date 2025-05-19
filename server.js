const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message || req.body.prompt;

  // Verifica se a mensagem foi enviada
  if (!userMessage || userMessage.trim() === '') {
    return res.json({ reply: 'Mensagem vazia. Envie algo para eu responder.' });
  }

  console.log("Mensagem recebida:", userMessage);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error);
    res.status(500).json({ error: 'Erro ao gerar resposta' });
  }
});

app.listen(port, () => {
  console.log(Servidor rodando na porta ${port});
});
