import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../data/api";

const cursos = {
  matematica: {
    title: "Matemática básica",
    overview:
      "Comece com leitura de conceitos e depois responda perguntas para que a IA avalie seu nível.",
    questions: [
      {
        id: "q1",
        label: "Qual é o resultado de 5 + 7?",
        placeholder: "Digite sua resposta",
      },
      {
        id: "q2",
        label: "Qual é o valor de x em 2x = 10?",
        placeholder: "Digite sua resposta",
      },
    ],
  },
  gramatica: {
    title: "Gramática e interpretação",
    overview:
      "Entenda conceitos de texto e depois responda perguntas para que a IA identifique seu nível.",
    questions: [
      {
        id: "q1",
        label: "Qual o sujeito da frase 'O gato dormiu'?",
        placeholder: "Digite sua resposta",
      },
      {
        id: "q2",
        label: "Qual a função de uma conjunção?",
        placeholder: "Digite sua resposta",
      },
    ],
  },
  raciocinio: {
    title: "Raciocínio lógico",
    overview:
      "Treine padrões de pensamento e responda perguntas para que a IA prepare sua trilha.",
    questions: [
      {
        id: "q1",
        label: "Se A implica B e A é verdadeiro, B é...",
        placeholder: "Digite sua resposta",
      },
      {
        id: "q2",
        label: "Qual número completa a sequência 2, 4, 6, ?",
        placeholder: "Digite sua resposta",
      },
    ],
  },
};

export default function Diagnostico() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tema, setTema] = useState("");
  const [respostas, setRespostas] = useState({});

  const cursoId = searchParams.get("curso") || "matematica";
  const curso = cursos[cursoId] || cursos.matematica;

  const handleRespostaChange = (id, value) => {
    setRespostas((prev) => ({ ...prev, [id]: value }));
  };

  async function aoEnviar(event) {
    event.preventDefault();

    try {
      const usuarioId = localStorage.getItem("usuarioId") || "1";
      const payload = {
        usuarioId,
        cursoId,
        respostas: {
          tema,
          ...respostas,
        },
      };

      const response = await api.post("/trilhas", payload);
      const trilha = response.data?.trilha || [];

      sessionStorage.setItem("trilha", JSON.stringify(trilha));
      sessionStorage.setItem("cursoId", cursoId);

      navigate(`/trilha?curso=${cursoId}`, {
        state: { trilha, cursoId },
      });
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
      navigate(`/trilha?curso=${cursoId}`, {
        state: { trilha: [], cursoId },
      });
    }
  }

  return (
    <>
      <h1>Diagnóstico</h1>
      <h2>{curso.title}</h2>
      <p>{curso.overview}</p>

      <form onSubmit={aoEnviar}>
        {curso.questions.map((question) => (
          <div key={question.id} style={{ marginTop: "1rem" }}>
            <label htmlFor={question.id}>{question.label}</label>
            <input
              id={question.id}
              value={respostas[question.id] || ""}
              onChange={(e) =>
                handleRespostaChange(question.id, e.target.value)
              }
              placeholder={question.placeholder}
              style={{ display: "block", marginTop: "0.25rem", width: "100%" }}
            />
          </div>
        ))}

        <button type="submit" style={{ marginTop: "1rem" }}>
          Confirmar
        </button>
      </form>
    </>
  );
}
