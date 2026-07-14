import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../data/api";
import "../styles/Diagnostico.css";

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

  const [loading, setLoading] = useState(false);

  const cursoId = searchParams.get("curso") || "matematica";

  const curso = cursos[cursoId] || cursos.matematica;

  function handleRespostaChange(id, value) {
    setRespostas((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function aoEnviar(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const usuario = JSON.parse(localStorage.getItem("usuario"));

      if (!usuario) {
        navigate("/login");

        return;
      }

      const payload = {
        usuarioId: usuario.id,

        cursoId,

        respostas: {
          tema,
          ...respostas,
        },
      };

      await api.post("/trilhas", payload);

      navigate(`/trilha?curso=${cursoId}`);
    } catch (error) {
      console.error("Erro ao criar trilha:", error);

      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="diagnostico-container">
      <div className="diagnostico-card">
        <button
          type="button"
          className="voltar-button"
          onClick={() => navigate("/cursos")}
          disabled={loading}
        >
          Voltar para cursos
        </button>

        <h1>Diagnóstico inicial</h1>

        <h2>{curso.title}</h2>

        <p>{curso.overview}</p>

        <form onSubmit={aoEnviar}>
          {curso.questions.map((question) => (
            <div key={question.id} className="pergunta-container">
              <label htmlFor={question.id}>{question.label}</label>

              <input
                id={question.id}
                value={respostas[question.id] || ""}
                onChange={(e) =>
                  handleRespostaChange(question.id, e.target.value)
                }
                placeholder={question.placeholder}
              />
            </div>
          ))}

          <button
            type="submit"
            className="diagnostico-button"
            disabled={loading}
          >
            {loading ? "Criando trilha personalizada..." : "Criar minha trilha"}
          </button>
        </form>
      </div>
    </div>
  );
}
