import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../data/api";
import "../styles/Topico.css";

export default function Topico() {
  const { id } = useParams();

  const [topico, setTopico] = useState(null);
  const [resposta, setResposta] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    async function carregarTopico() {
      try {
        const response = await api.get(`/topicos/${id}`);

        setTopico(response.data);
      } catch (error) {
        console.error("Erro ao carregar tópico:", error);
      }
    }

    carregarTopico();
  }, [id]);

  useEffect(() => {
    async function carregarResposta() {
      if (!usuario || !id) return;

      try {
        const response = await api.get(`/respostas/${usuario.id}/${id}`);

        setResposta(response.data.resposta || "");
        setFeedback(response.data.feedback || "");
      } catch (error) {
        console.error("Erro ao buscar resposta:", error);
      }
    }

    carregarResposta();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setMensagem("");

      const response = await api.post("/respostas", {
        usuarioId: usuario.id,
        trilhaId: id,
        resposta,
      });

      setFeedback(response.data.feedback || "");
      setMensagem("Resposta salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar resposta:", error);
      setMensagem("Erro ao salvar resposta.");
    } finally {
      setLoading(false);
    }
  }

  if (!topico) {
    return (
      <div className="page-container">
        <p>Carregando tópico...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="topic-content">
        <h1>{topico.title}</h1>

        <p className="content">{topico.conteudo_ensino}</p>

        <div className="info-box">
          <p>
            <strong>Pergunta:</strong>
            <br />
            {topico.pergunta}
          </p>

          <p>
            <strong>Dificuldade:</strong> {topico.dificuldade}
          </p>

          <p>
            <strong>Duração:</strong> {topico.duracao_minutos} minutos
          </p>
        </div>

        <form className="answer-form" onSubmit={handleSubmit}>
          <label>Sua resposta</label>

          <textarea
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            placeholder="Digite sua resposta..."
          />

          <button type="submit" disabled={loading}>
            {loading ? "Analisando resposta..." : "Enviar resposta"}
          </button>
        </form>

        {mensagem && <p className="success-message">{mensagem}</p>}

        {feedback && (
          <div className="feedback">
            <h3>Feedback da IA</h3>

            <p>{feedback}</p>
          </div>
        )}

        <div className="back-container">
          <Link className="back-link" to={`/trilha?curso=${topico.curso_id}`}>
            Voltar para a trilha
          </Link>
        </div>
      </div>
    </div>
  );
}
