import { useState } from "react";
import api from "../data/api.js";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  async function aoEnviar(e) {
    e.preventDefault();

    try {
      if (email.trim() === "") {
        alert("Por favor, preencha o email.");
        return;
      }

      const response = await api.post("/usuarios/login", {
        email,
      });


      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data.usuario)
      );


      setEmail("");

      navigate("/cursos");

    } catch (error) {
      console.log(error);

      alert("Email não encontrado.");
    }
  }


  return (
    <main className="login-container">

      <section className="login-card">

        <h1>Entrar</h1>

        <p className="login-descricao">
          Acesse sua conta para continuar sua trilha personalizada de aprendizagem.
        </p>


        <form 
          className="login-form"
          onSubmit={aoEnviar}
        >

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />


          <button type="submit">
            Entrar
          </button>

        </form>


        <Link
          className="login-link"
          to="/"
        >
          Ainda não tenho conta
        </Link>


      </section>

    </main>
  );
}