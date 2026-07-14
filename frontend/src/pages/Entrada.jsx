import { useState } from "react";
import api from "../data/api.js";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Entrada.css";

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

      const response = await api.post("/usuarios", {
        nome,
        email,
      });


      localStorage.setItem(
        "usuario",
        JSON.stringify({
          id: response.data.usuarioId,
          nome,
          email,
        })
      );


      setNome("");
      setEmail("");

      navigate("/cursos");

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <main className="entrada-container">

      <section className="entrada-card">

        <h1>Criar conta</h1>

        <p className="entrada-descricao">
          Cadastre-se para criar sua trilha personalizada de aprendizagem com inteligência artificial.
        </p>


        <form 
          className="entrada-form"
          onSubmit={aoEnviar}
        >

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo"
          />


          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />


          <button type="submit">
            Começar aprendizagem
          </button>

        </form>


        <Link 
          className="entrada-link"
          to="/login"
        >
          Já tenho uma conta
        </Link>


      </section>

    </main>
  );
}