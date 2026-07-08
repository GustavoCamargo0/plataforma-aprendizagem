import { Link } from "react-router-dom";

export default function Cursos() {
  const cursos = [
    {
      id: "matematica",
      title: "Matemática básica",
      description: "Conteúdo pronto com leitura, exercícios e avaliação inicial.",
    },
    {
      id: "gramatica",
      title: "Gramática e interpretação",
      description: "Aprenda com textos curtos e perguntas que reforçam a compreensão.",
    },
    {
      id: "raciocinio",
      title: "Raciocínio lógico",
      description: "Treine padrões de pensamento e problemas com feedback do tutor IA.",
    },
  ];

  return (
    <>
      <h1>Cursos</h1>

      {cursos.map((curso) => (
        <div key={curso.id}>
          <h3>{curso.title}</h3>
          <p>{curso.description}</p>
          <Link to={`/diagnostico?curso=${curso.id}`}>Acessar</Link>
        </div>
      ))}
    </>
  );
}