import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../data/api";

export default function Topico() {
  const { id } = useParams();

  const [topico, setTopico] = useState(null);
  const [resposta, setResposta] = useState("");
  const [mensagem, setMensagem] = useState("");

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
        const response = await api.get(
          `/respostas/${usuario.id}/${id}`
        );

        setResposta(response.data.resposta || "");

      } catch (error) {
        console.error("Erro ao buscar resposta:", error);
      }
    }

    carregarResposta();

  }, [id]);


  async function handleSubmit(event) {
    event.preventDefault();

    try {

      await api.post("/respostas", {
        usuarioId: usuario.id,
        trilhaId: id,
        resposta,
      });


      setMensagem("Resposta salva com sucesso!");

    } catch (error) {

      console.error("Erro ao salvar resposta:", error);
      setMensagem("Erro ao salvar resposta.");

    }
  }


  if (!topico) {
    return <p>Carregando tópico...</p>;
  }


  return (
    <>
      <h1>{topico.title}</h1>

      <p>
        {topico.conteudo_ensino}
      </p>


      <p>
        <strong>Pergunta:</strong> {topico.pergunta}
      </p>


      <p>
        <strong>Dificuldade:</strong> {topico.dificuldade}
      </p>


      <p>
        <strong>Duração:</strong> {topico.duracao_minutos} min
      </p>


      <form onSubmit={handleSubmit}>

        <label>
          Responda à pergunta:
        </label>

        <textarea
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          rows={5}
          placeholder="Digite sua resposta..."
        />

        <br />

        <button type="submit">
          Salvar resposta
        </button>

      </form>


      {mensagem && (
        <p style={{ color: "green" }}>
          {mensagem}
        </p>
      )}


      <br />

      <Link to={`/trilha?curso=${topico.curso_id}`}>
        Voltar para trilha
      </Link>

    </>
  );
}