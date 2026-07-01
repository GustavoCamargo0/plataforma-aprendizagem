export default function Entrada() {
  const [nome, setNome] = useState("");

  function aoDigitar(e) {
    setNome(e.target.value); // o estado acompanha o campo
  }
  function aoEnviar(e) {
    e.preventDefault(); // impede o reload da página
    // ...usar o valor de "nome" (ex.: salvar, navegar)
  }
  return (
    <>
      <h1>Entrada</h1>

      <form onSubmit={aoEnviar}>
        <input value={nome} onChange={aoDigitar} />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}
