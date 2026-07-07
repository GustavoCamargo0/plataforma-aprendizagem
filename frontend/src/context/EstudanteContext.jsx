// src/context/EstudanteContext.jsx
import { createContext, useContext, useState } from "react";

// 1) Cria o contexto:
const EstudanteContext = createContext();

// 2) Cria o Provider (vai "abraçar" o App no main.jsx):
export function EstudanteProvider({ children }) {
  const [estudante, setEstudante] = useState(null);
  const [progresso, setProgresso] = useState([]);

  return (
    <EstudanteContext.Provider
      value={{ estudante, setEstudante, progresso, setProgresso }}
    >
      {children}
    </EstudanteContext.Provider>
  );
}

// 3) Atalho para consumir o contexto nas telas:
export function useEstudante() {
  return useContext(EstudanteContext);
}