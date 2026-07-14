import { Link } from "react-router-dom";
import "../styles/Cursos.css";

export default function Cursos() {
  const cursos = [
    {
      id: "matematica",
      title: "Matemática básica",
      description:
        "Conteúdo personalizado com leitura, exercícios e avaliação inicial.",
    },
    {
      id: "gramatica",
      title: "Gramática e interpretação",
      description:
        "Aprenda conceitos de linguagem com exercícios adaptados ao seu nível.",
    },
    {
      id: "raciocinio",
      title: "Raciocínio lógico",
      description:
        "Treine padrões de pensamento e resolva problemas com feedback do tutor IA.",
    },
  ];


  return (
    <main className="cursos-container">

      <header className="cursos-header">
        <h1>Cursos disponíveis</h1>

        <p>
          Escolha um curso para realizar o diagnóstico e criar sua trilha personalizada.
        </p>
      </header>


      <section className="cursos-lista">

        {cursos.map((curso) => (

          <article 
            className="curso-card"
            key={curso.id}
          >

            <h3>
              {curso.title}
            </h3>


            <p>
              {curso.description}
            </p>


            <Link
              className="curso-link"
              to={`/diagnostico?curso=${curso.id}`}
            >
              Iniciar diagnóstico
            </Link>


          </article>

        ))}

      </section>


      <Link
        className="trilha-link"
        to="/trilha"
      >
        Ver minhas trilhas
      </Link>


    </main>
  );
}