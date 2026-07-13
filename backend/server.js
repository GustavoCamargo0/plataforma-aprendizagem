const express = require("express");
const cors = require("cors");
const app = express();
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const pool = require("./db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function getFallbackTrilha(cursoId) {
  const trilhas = {
    matematica: [
      {
        title: "Operações básicas",
        conteudo_ensino:
          "Comece revisando adição, subtração, multiplicação e divisão. Essas operações são a base para resolver problemas mais complexos com segurança.",
        pergunta: "Como resolver 8 + 5?",
        dificuldade: "iniciante",
        duracao_minutos: 15,
      },
      {
        title: "Equações simples",
        conteudo_ensino:
          "Aprenda a isolar a variável e encontrar o valor desconhecido em expressões simples. Esse passo é essencial para avançar em álgebra.",
        pergunta: "Qual é o valor de x em 2x = 10?",
        dificuldade: "intermediario",
        duracao_minutos: 20,
      },
      {
        title: "Problemas matemáticos",
        conteudo_ensino:
          "Pratique a interpretação de enunciados para transformar palavras em operações matemáticas. Isso ajuda a resolver problemas com mais confiança.",
        pergunta: "Como transformar um problema em uma conta?",
        dificuldade: "intermediario",
        duracao_minutos: 20,
      },
    ],
    gramatica: [
      {
        title: "Sujeito e predicado",
        conteudo_ensino:
          "Entenda quem pratica a ação e o que acontece na frase. Essa relação é o ponto central da análise sintática.",
        pergunta: "Qual é o sujeito da frase 'O gato dormiu'?",
        dificuldade: "iniciante",
        duracao_minutos: 15,
      },
      {
        title: "Conjunções",
        conteudo_ensino:
          "Conheça as principais conjunções e como elas conectam ideias dentro de um texto. Elas ajudam a organizar o raciocínio e a clareza da escrita.",
        pergunta: "Qual a função de uma conjunção?",
        dificuldade: "intermediario",
        duracao_minutos: 20,
      },
      {
        title: "Interpretação de texto",
        conteudo_ensino:
          "Treine a leitura atenta para identificar ideia principal, detalhes e inferências. Essa habilidade melhora tanto a compreensão quanto a produção textual.",
        pergunta: "Qual é a ideia central de um texto?",
        dificuldade: "intermediario",
        duracao_minutos: 20,
      },
    ],
    raciocinio: [
      {
        title: "Padrões lógicos",
        conteudo_ensino:
          "Observe sequências e regularidades para identificar o próximo elemento. Esse tipo de exercício estimula o raciocínio e a atenção aos detalhes.",
        pergunta: "Qual número completa a sequência 2, 4, 6, ?",
        dificuldade: "iniciante",
        duracao_minutos: 15,
      },
      {
        title: "Raciocínio condicional",
        conteudo_ensino:
          "Entenda implicações e relações entre afirmações. Esse raciocínio ajuda a tirar conclusões com mais segurança.",
        pergunta: "Se A implica B e A é verdadeiro, então B é?",
        dificuldade: "intermediario",
        duracao_minutos: 20,
      },
      {
        title: "Resolução de problemas",
        conteudo_ensino:
          "Aprenda a dividir um problema em etapas menores para encontrar a resposta de forma organizada. Essa estratégia é muito útil em provas e desafios.",
        pergunta: "Como organizar a solução de um problema lógico?",
        dificuldade: "intermediario",
        duracao_minutos: 20,
      },
    ],
  };

  return trilhas[cursoId] || trilhas.matematica;
}

function parseTrilha(texto) {
  if (!texto) {
    return null;
  }

  const cleaned = texto.trim();

  try {
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    const match = cleaned.match(/\[[\s\S]*\]/);

    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        return Array.isArray(parsed) ? parsed : null;
      } catch {
        return null;
      }
    }
  }

  return null;
}

app.post("/usuarios", async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      error: "Nome e email são obrigatórios",
    });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO usuarios (nome, email)
       VALUES ($1, $2)
       RETURNING id`,
      [nome, email],
    );

    res.json({
      usuarioId: resultado.rows[0].id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: err.message });
  }
});

app.post("/usuarios/login", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email é obrigatório",
    });
  }

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", 
      [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Email inválido",
      });
    }

    const usuario = result.rows[0];

    res.json({
      sucesso: true,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});
app.post("/trilhas", async (req, res) => {
  const { usuarioId, cursoId, respostas } = req.body;

  if (!usuarioId || !cursoId || !respostas) {
    return res.status(400).json({
      error: "usuarioId, cursoId e respostas são obrigatórios",
    });
  }

  const prompt = `
    Você é um tutor especialista em educação. O aluno quer aprender sobre "${cursoId}".
    Aqui está a avaliação inicial dele: ${JSON.stringify(respostas)}.

    Gere uma trilha de estudos personalizada com entre 3 e 6 tópicos. Para cada tópico, produza os seguintes campos:
    - "title": título curto do tópico
    - "conteudo_ensino": explicação didática e concisa (3-6 parágrafos) do conceito
    - "pergunta": uma pergunta que avalie o aprendizado do tópico (curta)
    - "dificuldade": "iniciante" | "intermediario" | "avancado"
    - "duracao_minutos": estimativa de tempo sugerido para estudo

    Retorne ESTRITAMENTE um array JSON com esses objetos, sem texto adicional, sem markdown e sem comentários.
  `;

  try {
    let trilha = getFallbackTrilha(cursoId);

    if (process.env.GEMINI_API_KEY) {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text || "";
      const parsed = parseTrilha(text);

      if (parsed && parsed.length) {
        trilha = parsed;
      }
    }

    await pool.query(
      `DELETE FROM trilhas
   WHERE usuario_id = $1
   AND curso_id = $2`,
      [usuarioId, cursoId],
    );

    for (const topico of trilha) {
      await pool.query(
        `INSERT INTO trilhas
    (usuario_id, curso_id, titulo, conteudo_ensino, pergunta, dificuldade, duracao_minutos)
    VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          usuarioId,
          cursoId,
          topico.title,
          topico.conteudo_ensino,
          topico.pergunta,
          topico.dificuldade,
          topico.duracao_minutos,
        ],
      );
    }
    return res.json({
      sucesso: true,
      trilha,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/trilhas/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const resultado = await pool.query(
      `
      SELECT
        id,
        curso_id,
        titulo AS title,
        conteudo_ensino,
        pergunta,
        dificuldade,
        duracao_minutos
      FROM trilhas
      WHERE usuario_id = $1
      ORDER BY id
      `,
      [usuarioId],
    );

    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/respostas", async (req, res) => {
  const { usuarioId, trilhaId, resposta } = req.body;

  try {
    await pool.query(
      `
      INSERT INTO respostas (usuario_id, trilha_id, resposta)
      VALUES ($1,$2,$3)
      ON CONFLICT (usuario_id, trilha_id)
      DO UPDATE
      SET resposta = EXCLUDED.resposta,
          atualizado_em = CURRENT_TIMESTAMP
      `,
      [usuarioId, trilhaId, resposta]
    );

    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/respostas/:usuarioId/:trilhaId", async (req, res) => {
  const { usuarioId, trilhaId } = req.params;

  try {
    const resultado = await pool.query(
      `
      SELECT resposta
      FROM respostas
      WHERE usuario_id = $1
      AND trilha_id = $2
      `,
      [usuarioId, trilhaId]
    );

    if (resultado.rows.length === 0) {
      return res.json({ resposta: "" });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/topicos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      `
      SELECT
        id,
        curso_id,
        titulo AS title,
        conteudo_ensino,
        pergunta,
        dificuldade,
        duracao_minutos
      FROM trilhas
      WHERE id = $1
      `,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        error: "Tópico não encontrado"
      });
    }

    res.json(resultado.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
