# Plataforma de Aprendizagem

Uma plataforma web de aprendizagem personalizada que utiliza Inteligência Artificial para auxiliar estudantes na criação de trilhas de estudo, acompanhamento de progresso e avaliação de respostas.

## Sobre o projeto

A **Plataforma de Aprendizagem** foi desenvolvida com o objetivo de oferecer uma experiência de estudo personalizada.

O sistema permite que o estudante selecione uma área de conhecimento e receba uma **trilha de estudos composta por diferentes tópicos**, organizada de acordo com suas necessidades.

Durante o processo, o estudante pode responder atividades e receber **feedback gerado por Inteligência Artificial**, permitindo compreender seus erros e acompanhar sua evolução.

A aplicação também possui um painel para visualização do progresso e histórico das atividades realizadas.

## Principais funcionalidades

* Cadastro de estudantes
* Login de usuários
* Seleção de áreas de conhecimento
* Geração de trilhas de estudo personalizadas
* Organização dos estudos em tópicos
* Resolução de atividades
* Análise das respostas utilizando Inteligência Artificial
* Feedback automático sobre as respostas
* Acompanhamento do progresso do estudante
* Histórico de atividades
* Interface web responsiva
* Comunicação entre frontend e backend através de uma API REST

## Funcionamento

O fluxo principal da aplicação funciona da seguinte maneira:

```text
Estudante
    │
    ▼
Frontend React
    │
    ▼
API REST - Express
    │
    ├──────────────► PostgreSQL
    │
    ▼
Google Gemini
    │
    ▼
Análise e geração de conteúdo
    │
    ▼
Feedback para o estudante
```

O estudante interage com a aplicação através do frontend. As informações são enviadas para o backend, responsável por processar as requisições, consultar o banco de dados e, quando necessário, utilizar a API do Google Gemini para gerar trilhas e analisar respostas.

## Tecnologias utilizadas

### Frontend

O frontend foi desenvolvido utilizando:

* **React 19** — construção da interface da aplicação
* **JavaScript / JSX** — desenvolvimento da lógica e componentes
* **Vite** — ferramenta de desenvolvimento e build
* **React Router DOM** — gerenciamento das rotas da aplicação
* **Axios** — comunicação com a API do backend
* **CSS** — estilização da interface
* **ESLint** — padronização e análise do código

### Backend

O backend utiliza:

* **Node.js** — ambiente de execução JavaScript
* **Express 5** — criação da API REST
* **JavaScript** — desenvolvimento da lógica do servidor
* **PostgreSQL** — armazenamento dos dados
* **node-postgres (pg)** — conexão entre Node.js e PostgreSQL
* **CORS** — controle de comunicação entre frontend e backend
* **dotenv** — gerenciamento de variáveis de ambiente

### Inteligência Artificial

A aplicação utiliza a **Google Gemini API**, através do pacote `@google/genai`.

A Inteligência Artificial é utilizada principalmente para:

* Geração de trilhas de aprendizagem
* Personalização do conteúdo
* Análise das respostas dos estudantes
* Geração de feedback

A chave da API deve ser armazenada em uma variável de ambiente e **não deve ser inserida diretamente no código-fonte**.

## Banco de dados

O projeto utiliza **PostgreSQL** para armazenar informações relacionadas à plataforma.

Entre os dados trabalhados pelo backend estão informações relacionadas a:

* Usuários
* Cursos
* Trilhas de aprendizagem
* Tópicos
* Respostas
* Progresso
* Histórico de atividades

A conexão com o banco é realizada através de variáveis de ambiente.

## Estrutura do projeto

```text
plataforma-aprendizagem/
│
├── backend/
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── context/
│   │   │   └── EstudanteContext.jsx
│   │   │
│   │   ├── data/
│   │   │   └── api.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Cursos.jsx
│   │   │   ├── Diagnostico.jsx
│   │   │   ├── Entrada.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Painel.jsx
│   │   │   ├── Topico.jsx
│   │   │   └── Trilha.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── eslint.config.js
│   ├── index.html
│   └── vite.config.js
│
└── .gitignore
```

## API

O backend disponibiliza endpoints para as principais funcionalidades da plataforma.

Alguns dos endpoints implementados são:

| Método | Endpoint                          | Função                          |
| ------ | --------------------------------- | ------------------------------- |
| POST   | `/usuarios`                       | Cadastro de usuário             |
| POST   | `/usuarios/login`                 | Login                           |
| POST   | `/trilhas`                        | Criação de uma trilha           |
| GET    | `/trilhas/:usuarioId`             | Consulta da trilha do usuário   |
| DELETE | `/trilhas/:usuarioId`             | Exclusão da trilha              |
| POST   | `/respostas`                      | Envio de resposta               |
| GET    | `/respostas/:usuarioId/:trilhaId` | Consulta das respostas          |
| GET    | `/topicos/:id`                    | Consulta de tópico              |
| GET    | `/painel/:usuarioId`              | Consulta do painel de progresso |
| GET    | `/historico/:usuarioId`           | Consulta do histórico           |

## Impacto da aplicação

A plataforma busca tornar o processo de aprendizagem mais **personalizado, interativo e acessível**.

Em vez de oferecer apenas um conteúdo fixo para todos os estudantes, o sistema utiliza Inteligência Artificial para adaptar parte da experiência de estudo às necessidades do usuário.

O feedback automático também pode ajudar o estudante a identificar dificuldades com maior rapidez, enquanto o acompanhamento de progresso permite visualizar sua evolução ao longo da utilização da plataforma.

Dessa forma, o projeto demonstra como tecnologias como **Inteligência Artificial, desenvolvimento web e bancos de dados relacionais** podem ser combinadas para criar soluções voltadas à educação.

## Como executar o projeto

### Pré-requisitos

Antes de iniciar, é necessário possuir instalado:

* Node.js
* npm
* PostgreSQL
* Uma chave da API do Google Gemini

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd plataforma-aprendizagem
```

### 2. Configure o backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env`:

```env
GEMINI_API_KEY=sua_chave_gemini

DB_USER=seu_usuario
DB_HOST=localhost
DB=
DB_PASS=sua_senha
DB_PORT=5432
```

Preencha os valores de acordo com a configuração do seu PostgreSQL.

### 3. Configure o banco de dados

Crie um banco PostgreSQL para a aplicação e configure as tabelas necessárias de acordo com a estrutura utilizada pelo backend.

Certifique-se de que as informações de conexão presentes no `.env` correspondam ao banco criado.

### 4. Inicie o backend

Na pasta `backend`:

```bash
node server.js
```

O servidor será iniciado na porta configurada pelo projeto.

### 5. Configure o frontend

Abra outro terminal e entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação, normalmente:

```text
http://localhost:5173
```

## Scripts disponíveis

### Frontend

Iniciar ambiente de desenvolvimento:

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```

Executar o build:

```bash
npm run preview
```

Verificar problemas no código:

```bash
npm run lint
```

### Backend

Instalar dependências:

```bash
npm install
```

Iniciar o servidor:

```bash
node server.js
```

## Variáveis de ambiente

As informações sensíveis não devem ser armazenadas diretamente no código ou no repositório.

O projeto utiliza variáveis de ambiente para informações como:

```env
GEMINI_API_KEY=
DB_USER=
DB_HOST=
DB=
DB_PASS=
DB_PORT=
```

O arquivo `.env` deve permanecer fora do controle de versão.

Um arquivo `.env.example` pode ser utilizado para documentar quais variáveis são necessárias:

```env
GEMINI_API_KEY=

DB_USER=
DB_HOST=
DB=
DB_PASS=
DB_PORT=
```

## Segurança

Para ambientes de produção, recomenda-se implementar medidas adicionais, como:

* Autenticação utilizando senha e/ou tokens
* Hash de senhas com algoritmos apropriados
* JWT ou sessões para autenticação
* Validação dos dados recebidos pela API
* Controle de autorização por usuário
* Restrição de CORS
* Limitação de requisições aos endpoints que utilizam IA
* Tratamento seguro de erros
* Não exposição de informações internas do servidor
* Proteção das credenciais do banco de dados e da API Gemini

## Objetivo acadêmico e tecnológico

Este projeto demonstra a integração de diferentes tecnologias para resolver um problema real relacionado à educação.

A aplicação combina:

**Frontend + API REST + Banco de Dados + Inteligência Artificial**

permitindo explorar conceitos de desenvolvimento web full stack, gerenciamento de dados, integração com APIs externas e aplicação prática de Inteligência Artificial.

## Licença

Este projeto é de uso educacional e/ou acadêmico.

Consulte o repositório para obter informações adicionais sobre sua licença e condições de uso.
