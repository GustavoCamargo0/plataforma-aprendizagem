import { useState } from "react";
import axios from "axios";

export default function Diagnostico() {
  const [tema, setTema] = useState("");

  async function aoEnviar(e) {
    e.preventDefault();

    try {
      const resposta = await axios.post("http://localhost:3000/diagnosticar", {
        tema,
      });

      setPerguntas(resposta.data.perguntas);
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <>
      <h1>Diagnóstico</h1>

      <form onSubmit={aoEnviar}>
        <input
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="No que sente que tem dificuldade ou que precisa melhorar?"
        />

        <button type="submit">Confirmar</button>
      </form>
    </>
  );
}