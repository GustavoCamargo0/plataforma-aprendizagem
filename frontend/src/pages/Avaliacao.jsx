import { useState } from "react";
import axios from "axios";

export default function Diagnostico() {
  const [perguntas, setPerguntas] = useState([]);

  const resposta = await axios.get(
    `http://localhost:3000/diagnostico/${id}`
);

setPerguntas(resposta.data.perguntas);

  return (
    <>
      <h1>Avaliação</h1>

      {perguntas.map((p) => (
        <div key={p.id}>
          <h3>{p.pergunta}</h3>
          <textarea />
        </div>
      ))}
    </>
  );
}