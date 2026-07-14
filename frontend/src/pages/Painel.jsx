import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../data/api";
import "../styles/Painel.css";

export default function Painel() {
  const [trilha, setTrilha] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const navigate = useNavigate();


  useEffect(() => {
    async function carregarPainel() {

      if (!usuario) {
        setCarregando(false);
        return;
      }


      try {

        const trilhaResponse = await api.get(
          `/painel/${usuario.id}`
        );


        const historicoResponse = await api.get(
          `/historico/${usuario.id}`
        );


        setTrilha(
          trilhaResponse.data.trilha || []
        );


        setHistorico(
          historicoResponse.data || []
        );


      } catch (error) {

        console.error(
          "Erro ao carregar painel:",
          error
        );

      } finally {

        setCarregando(false);

      }

    }


    carregarPainel();

  }, []);



  function sairConta() {

    localStorage.removeItem("usuario");

    navigate("/login");

  }



  async function sairCurso() {


    const confirmar = window.confirm(
      "Tem certeza que deseja sair do curso atual? Todo o progresso deste curso será removido."
    );


    if (!confirmar) {
      return;
    }



    try {


      await api.delete(
        `/trilhas/${usuario.id}`
      );


      navigate("/cursos");


    } catch(error) {


      console.error(
        "Erro ao sair do curso:",
        error
      );


      alert(
        "Erro ao sair do curso."
      );

    }

  }



  if (!usuario) {

    return (

      <div className="painel-container">

        <h1>Usuário não encontrado</h1>

        <p>
          Faça login novamente para acessar seu painel.
        </p>

      </div>

    );

  }



  if (carregando) {

    return (

      <div className="painel-container">

        <p>
          Carregando painel...
        </p>

      </div>

    );

  }



  const totalTopicos = trilha.length;


  const topicosConcluidos =
    trilha.filter(
      (topico) => topico.concluido
    ).length;



  const progresso = totalTopicos
    ? Math.round(
        (topicosConcluidos / totalTopicos) * 100
      )
    : 0;



  return (

    <div className="painel-container">


      <header className="painel-header">


        <div>

          <h1>
            Olá, {usuario.nome}
          </h1>


          <p>
            Acompanhe sua evolução nos estudos.
          </p>

        </div>



        <div className="painel-actions">


          {
            trilha.length > 0 && (

              <button
                className="botao-sair-curso"
                onClick={sairCurso}
              >
                Sair do curso atual
              </button>

            )
          }



          <button
            className="botao-sair-conta"
            onClick={sairConta}
          >
            Sair da conta
          </button>


        </div>


      </header>




      <section className="progresso-card">


        <h2>
          Seu progresso
        </h2>


        <div className="barra-container">

          <div

            className="barra-progresso"

            style={{
              width: `${progresso}%`
            }}

          />

        </div>



        <p className="progresso-info">

          {topicosConcluidos} de {totalTopicos} tópicos concluídos
          ({progresso}%)

        </p>


      </section>





      <section className="painel-section">


        <h2>
          Trilha atual
        </h2>



        {
          trilha.length > 0 ? (

            <div className="trilha-lista">


              {
                trilha.map((topico) => (

                  <div

                    key={topico.id}

                    className={
                      topico.concluido
                      ? "topico concluido"
                      : "topico"
                    }

                  >


                    <h3>
                      {topico.title}
                    </h3>


                    <p>
                      Dificuldade: {topico.dificuldade}
                    </p>


                    <p>
                      Duração: {topico.duracao_minutos} min
                    </p>



                    <span>

                      {
                        topico.concluido
                        ? "Concluído"
                        : "Pendente"
                      }

                    </span>


                  </div>

                ))
              }


            </div>


          ) : (


            <p>
              Você ainda não possui uma trilha criada.
            </p>


          )

        }


      </section>






      <section className="painel-section">


        <h2>
          Histórico de desempenho
        </h2>



        {
          historico.length > 0 ? (


            <div className="historico-lista">


              {
                historico.map((item) => (


                  <div

                    key={item.id}

                    className="historico-card"

                  >


                    <h3>
                      {item.topico}
                    </h3>



                    <p>
                      <strong>
                        Sua resposta:
                      </strong>
                    </p>


                    <p>
                      {item.resposta}
                    </p>



                    {
                      item.feedback && (

                        <>

                          <p>

                            <strong>
                              Feedback da IA:
                            </strong>

                          </p>


                          <p>
                            {item.feedback}
                          </p>

                        </>

                      )
                    }



                  </div>


                ))
              }


            </div>


          ) : (


            <p>
              Nenhuma resposta registrada ainda.
            </p>


          )

        }


      </section>


    </div>

  );

}