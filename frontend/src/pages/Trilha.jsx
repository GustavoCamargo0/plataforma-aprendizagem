import { useEffect, useState } from "react";
import api from "../data/api";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/Trilha.css";

export default function Trilha() {
  const [searchParams] = useSearchParams();

  const [trilha, setTrilha] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const cursoId = searchParams.get("curso") || "";

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

      setTrilha(resposta.data);
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
    <main className="trilha-container">
      <header className="trilha-header">
        <h1>Sua trilha de aprendizagem</h1>

        {cursoId && (
          <p>
            Curso: <strong>{titulos[cursoId]}</strong>
          </p>
        )}
      </header>

      {trilha.length > 0 ? (
        <ul className="trilha-lista">
          {trilha.map((topico) => (
            <li className="trilha-item" key={topico.id}>
              <div className="trilha-topico">
                <Link
                  className={`trilha-link ${
                    topico.concluido ? "concluido" : "pendente"
                  }`}
                  to={`/topico/${topico.id}`}
                >
                  {topico.title}
                </Link>

                <span
                  className={`trilha-status ${
                    topico.concluido ? "status-concluido" : "status-pendente"
                  }`}
                >
                  {topico.concluido ? "Concluído" : "Pendente"}
                </span>
              </div>

              <div className="trilha-info">
                {topico.dificuldade}
                {" • "}
                {topico.duracao_minutos} min
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="trilha-vazia">
          Você ainda não possui uma trilha para este curso.
        </p>
      )}
    </main>
  );
}
