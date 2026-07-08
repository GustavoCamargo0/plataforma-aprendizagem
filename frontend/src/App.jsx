// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Entrada from "./pages/Entrada.jsx";
import Diagnostico from "./pages/Diagnostico.jsx";
import Trilha from "./pages/Trilha.jsx";
import Topico from "./pages/Topico.jsx";
import Painel from "./pages/Painel.jsx";
import Cursos from "./pages/Cursos.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Entrada />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/diagnostico" element={<Diagnostico />} />
      <Route path="/trilha" element={<Trilha />} />
      <Route path="/topico/:id" element={<Topico />} />
      <Route path="/painel" element={<Painel />} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

export default App;