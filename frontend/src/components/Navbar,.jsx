import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();

  const rotasVisiveis = ["/trilha", "/painel", "/cursos"];

  const mostrarNavbar = rotasVisiveis.some((rota) =>
    location.pathname.startsWith(rota),
  );

  if (!mostrarNavbar) {
    return null;
  }

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/cursos" className="navbar-logo">
          Aprendizagem IA
        </Link>

        <div className="navbar-links">
          <Link to="/cursos">
            Cursos
          </Link>

          {usuario && (
            <Link to="/trilha">
              Ver trilha
            </Link>
          )}

          {usuario && (
            <Link to="/painel">
              Painel
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}