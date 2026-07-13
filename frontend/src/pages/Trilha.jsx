import { useEffect, useState } from "react";
import api from "../data/api";
import { Link, useSearchParams } from "react-router-dom";

export default function Trilha() {
  const [searchParams] = useSearchParams();

  const [trilha, setTrilha] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const cursoId = searchParams.get("curso") || "matematica";

  const titulos = {
    matematica: "Matemática básica",
    gramatica: "Gramática e interpretação",
    raciocinio: "Raciocínio lógico",
  };

  useEffect(() => {
    async function carregarTrilha() {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario) {
          return;
        }

        const resposta = await api.get(`/trilhas/${usuario.id}`);

        // Como o usuário pode ter trilhas de vários cursos,
        // mostra apenas a do curso atual.
        const trilhaCurso = resposta.data.filter(
          (topico) => topico.curso_id === cursoId,
        );

        setTrilha(trilhaCurso);
      } catch (error) {
        console.error("Erro ao carregar trilha:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarTrilha();
  }, [cursoId]);

  if (carregando) {
    return <p>Carregando trilha...</p>;
  }

  return (
    <>
      <h1>Trilha</h1>

      <p>
        Você foi direcionado para a trilha de{" "}
        {titulos[cursoId] || titulos.matematica}.
      </p>

      {trilha.length > 0 ? (
        <ul>
          {trilha.map((topico, index) => (
            <li key={topico.id} style={{ marginBottom: "1rem" }}>
              <Link to={`/topico/${topico.id}`}>{topico.title}</Link>

              <div>
                {topico.dificuldade} • {topico.duracao_minutos} min
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Você ainda não possui uma trilha para este curso.</p>
      )}
    </>
  );
}
