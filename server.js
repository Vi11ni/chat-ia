const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ response: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error);
    res.status(500).json({ error: 'Erro ao gerar resposta' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
