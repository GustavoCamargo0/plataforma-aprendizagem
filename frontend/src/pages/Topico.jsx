
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Topico() {
  const { id } = useParams();
  const location = useLocation();
  const topico = location.state?.topico;
  const trilha = location.state?.trilha || [];
  const cursoId = location.state?.cursoId || sessionStorage.getItem("cursoId") || "matematica";

  const [resposta, setResposta] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!topico) {
      return;
    }

    const respostaSalva =
      sessionStorage.getItem(`topico-${id}-resposta`) || topico.resposta || "";

    setResposta(respostaSalva);
    setMensagem(respostaSalva ? "Resposta salva." : "");
  }, [id, topico]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!topico) {
      return;
    }

    sessionStorage.setItem(`topico-${id}-resposta`, resposta);

    const trilhaAtualizada = trilha.map((item, index) =>
      Number(index) === Number(id) ? { ...item, resposta } : item,
    );

    if (trilhaAtualizada.length) {
      sessionStorage.setItem("trilha", JSON.stringify(trilhaAtualizada));
    }

    setMensagem("Resposta salva com sucesso!");
  }

  const trilhaParaVoltar = trilha.map((item, index) =>
    Number(index) === Number(id) ? { ...item, resposta } : item,
  );

  return (
    <>
      <h1>{topico?.title || `Tópico ${id}`}</h1>
      <p>{topico?.conteudo_ensino || "Conteúdo não disponível no momento."}</p>

      {topico?.pergunta ? (
        <p>
          <strong>Pergunta:</strong> {topico.pergunta}
        </p>
      ) : null}

      <p>
        <strong>Dificuldade:</strong> {topico?.dificuldade || "-"}
      </p>
      <p>
        <strong>Duração:</strong> {topico?.duracao_minutos || "-"} min
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <label htmlFor="resposta-topico" style={{ display: "block", marginBottom: "0.25rem" }}>
          Responda à pergunta
        </label>
        <textarea
          id="resposta-topico"
          value={resposta}
          onChange={(event) => setResposta(event.target.value)}
          placeholder="Escreva sua resposta aqui"
          rows={4}
          style={{ width: "100%", maxWidth: "32rem" }}
        />
        <div style={{ marginTop: "0.5rem" }}>
          <button type="submit">Salvar resposta</button>
        </div>
      </form>

      {mensagem ? <p style={{ color: "green" }}>{mensagem}</p> : null}

      {trilha.length > 0 ? (
        <Link to={`/trilha?curso=${cursoId}`} state={{ trilha: trilhaParaVoltar, cursoId }}>
          Voltar para a trilha
        </Link>
      ) : null}
    </>
  );
}