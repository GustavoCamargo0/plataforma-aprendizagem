import { useState } from "react";

export default function Diagnostico() {
  const [nome, setNome] = useState("");
  const [dif, setDif] = useState("")

  
  
  return (
    <>
      <h1>Diagonostico</h1>

      <form onSubmit={aoEnviar}>
        <input value={nome} onChange={(e) => setDif(e.target.value)} placeholder="Seu Nome" />
         <input value={nome} onChange={(e => setDif(e.target.value))} placeholder="No que sente que tem dificuldade ou que precisa melhorar?" />
        <button type="submit">Confirmar</button>
      </form>
    </>
  );
}
