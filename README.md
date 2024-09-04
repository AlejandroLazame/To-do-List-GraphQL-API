# To-do List GraphQL API

Uma API GraphQL para gerenciar uma lista de tarefas, desenvolvida para demonstrar o uso do GraphQL com um backend simples.

## Índice

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Sobre

O projeto "To-do List GraphQL API" é uma API baseada em GraphQL que permite criar, ler, atualizar e excluir tarefas em uma lista de tarefas. O objetivo é fornecer uma interface robusta e flexível para gerenciar itens de uma lista, utilizando o padrão GraphQL para consultas e manipulação de dados.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript do lado do servidor.
- **Express.js**: Framework para construção de APIs em Node.js.
- **GraphQL**: Linguagem de consulta para APIs.
- **MongoDB**: Ba

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. Clone o repositório:

  ```bash
   git clone https://github.com/AlejandroLazame/To-do-List-GraphQL-API.git
 ```
2. Navegue até o diretório do projeto:
  
  ```bash
    cd To-do-List-GraphQL-API
  ```
3. Instale as dependências:

  ```bash
    npm install
  ```

4. Configure o banco de dados MongoDB. Certifique-se de que você tem uma instância do MongoDB em execução e ajuste a URL de conexão no arquivo .env conforme necessário.

5. Inicie o servidor:
  ```bash
    npm start
  ```

## Uso
Depois de iniciar o servidor, você pode interagir com a API GraphQL através da URL http://localhost:4000/graphql. Utilize uma ferramenta como GraphiQL ou Postman para executar consultas e mutações.

## Endpoints

### Query

- **`todos`**
  - **Descrição**: Obtém todas as tarefas.
  - **Exemplo de Consulta**:
    ```graphql
    query {
      todos {
        id
        title
        description
        completed
      }
    }
    ```

- **`todo(id: ID!)`**
  - **Descrição**: Obtém uma tarefa específica pelo ID.
  - **Parâmetros**:
    - `id` (ID!): O ID da tarefa que você deseja obter.
  - **Exemplo de Consulta**:
    ```graphql
    query {
      todo(id: "60d5f4862f8fb814d4c9b0b8") {
        id
        title
        description
        completed
      }
    }
    ```

### Mutation

- **`createTodo(title: String!, description: String): Todo`**
  - **Descrição**: Cria uma nova tarefa.
  - **Parâmetros**:
    - `title` (String!): O título da nova tarefa.
    - `description` (String): A descrição da nova tarefa (opcional).
  - **Exemplo de Mutação**:
    ```graphql
    mutation {
      createTodo(title: "Nova Tarefa", description: "Descrição da nova tarefa") {
        id
        title
        description
        completed
      }
    }
    ```

- **`updateTodo(id: ID!, title: String, description: String): Todo`**
  - **Descrição**: Atualiza uma tarefa existente.
  - **Parâmetros**:
    - `id` (ID!): O ID da tarefa que você deseja atualizar.
    - `title` (String): O novo título da tarefa (opcional).
    - `description` (String): A nova descrição da tarefa (opcional).
  - **Exemplo de Mutação**:
    ```graphql
    mutation {
      updateTodo(id: "60d5f4862f8fb814d4c9b0b8", title: "Título Atualizado", description: "Descrição atualizada") {
        id
        title
        description
        completed
      }
    }
    ```

- **`deleteTodo(id: ID!): Todo`**
  - **Descrição**: Exclui uma tarefa pelo ID.
  - **Parâmetros**:
    - `id` (ID!): O ID da tarefa que você deseja excluir.
  - **Exemplo de Mutação**:
    ```graphql
    mutation {
      deleteTodo(id: "60d5f4862f8fb814d4c9b0b8") {
        id
        title
        description
        completed
      }
    }
    ```
