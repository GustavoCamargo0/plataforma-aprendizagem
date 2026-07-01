import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav>
        <h1>Plataforma</h1>

        <ul>
          <li>
            <Link to="/trilha">Trilha</Link>
          </li>

          <li>
            <Link to="/topico/:id">Topico</Link>
          </li>

          <li>
            <Link to="/painel">Painel</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
