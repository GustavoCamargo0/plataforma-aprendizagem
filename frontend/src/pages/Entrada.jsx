import { useState } from "react";
import api from "../data/api.js";
import { useNavigate } from "react-router-dom";

export default function Entrada() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  async function aoEnviar(e) {
    e.preventDefault();

    try {
      if (nome.trim() === "" || email.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      await api.post("/usuarios", {
        nome,
        email,
      });

      setNome("");
      setEmail("");

      navigate("/diagnostico");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Entrada</h1>

      <form onSubmit={aoEnviar}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}
