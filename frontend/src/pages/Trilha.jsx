
import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function Trilha() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const cursoId = searchParams.get("curso") || location.state?.cursoId || "matematica";

  const titulos = {
    matematica: "Matemática básica",
    gramatica: "Gramática e interpretação",
    raciocinio: "Raciocínio lógico",
  };

  const trilha = location.state?.trilha || JSON.parse(sessionStorage.getItem("trilha") || "null") || [];

  return (
    <>
      <h1>Trilha</h1>
      <p>Você foi direcionado para a trilha de {titulos[cursoId] || titulos.matematica}.</p>

      {trilha.length > 0 ? (
        <ul>
          {trilha.map((topico, index) => (
            <li key={`${topico.title}-${index}`} style={{ marginBottom: "1rem" }}>
              <Link
                to={`/topico/${index}`}
                state={{ topico, trilha, cursoId }}
                style={{ fontWeight: "bold" }}
              >
                {topico.title}
              </Link>
              <div>
                {topico.dificuldade} • {topico.duracao_minutos} min
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum tópico foi carregado ainda.</p>
      )}
    </>
  );
}