import { useState } from "react";
import api from "../data/api.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  async function aoEnviar(e) {
    e.preventDefault();

    try {
      if ( email.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return;
      }

       await api.post("/usuarios/login", {
        email,
      });


      setNome("");
      setEmail("");

      navigate("/cursos");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={aoEnviar}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to={"/"}>Ainda não tem conta?</Link>
    </>
  );
}
