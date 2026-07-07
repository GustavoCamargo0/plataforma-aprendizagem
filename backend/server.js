const express = require('express');
const cors = require('cors')
const app = express();
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const pool = require('./db');


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/diagnosticar", async (req, res) => {
  const { tema } = req.body;

  if (!tema) {
    return res.status(400).json({
      error: "Informar o tema é obrigatório",
    });
  }

const prompt = `
Você é um professor.

O aluno deseja aprender:

${tema}

Crie uma avaliação diagnóstica com cinco perguntas.

Responda APENAS neste formato JSON:

{
  "perguntas":[
    {
      "id":1,
      "pergunta":"..."
    }
  ]
}
`;

 try {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const texto = response.text;
  const dados = JSON.parse(texto);

  // Salva o diagnóstico
  const diagnostico = await pool.query(
    `INSERT INTO diagnosticos (usuario_id, tema)
     VALUES ($1, $2)
     RETURNING id`,
    [usuarioId, tema]
  );

  const diagnosticoId = diagnostico.rows[0].id;

  for (const pergunta of dados.perguntas) {
    await pool.query(
      `INSERT INTO perguntas_diagnostico (diagnostico_id, pergunta)
       VALUES ($1, $2)`,
      [diagnosticoId, pergunta.pergunta]
    );
  }

  res.json({
    diagnosticoId,
  });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get("/diagnostico/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            "SELECT * FROM diagnosticos WHERE id = $1",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Diagnóstico não encontrado"
            });
        }

        res.json(resultado.rows[0]);

    } catch (err) {
        res.status(500).json({
            erro: err.message
        });
    }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});