# To-do List GraphQL API

Uma API GraphQL para gerenciar uma lista de tarefas, desenvolvida para demonstrar o uso do GraphQL com um backend simples.

## Índice

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Contribuição](#contribuição)

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
## Contribuição

Agradecemos contribuições para melhorar esta API GraphQL da lista de tarefas! Seja corrigindo bugs, adicionando novas funcionalidades ou melhorando a documentação, sua ajuda é bem-vinda.

### Como Contribuir

1. **Faça um fork do repositório**: Clique no botão "Fork" no canto superior direito desta página do repositório.
2. **Clone o seu fork**:
  ```bash
   git clone https://github.com/seu-usuario/To-do-List-GraphQL-API.git
  ```
3. **Crie uma nova branch**:
  ```bash
    git checkout -b feature/nome-da-sua-feature
  ```
4. **Faça suas alterações**: Implemente a funcionalidade, correção ou melhoria na documentação.
5. **Faça o commit das suas alterações**:
  ```bash
    git commit -m "Adicione uma mensagem descritiva aqui"
  ```
6. **Envie para o seu repositório**:
  ```bash
    git push origin feature/nome-da-sua-feature
  ```
7. **Crie um Pull Request**: Abra um pull request da sua branch para a branch main do repositório original. Certifique-se de fornecer uma descrição clara das suas alterações.

## Diretrizes para Contribuição
- Certifique-se de que seu código segue o estilo e as convenções existentes no projeto.
- Escreva mensagens de commit claras e concisas.
- Se estiver adicionando uma nova funcionalidade, atualize a documentação conforme necessário.
- Seja receptivo ao feedback das revisões de código.
