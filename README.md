# 🗓️ Agenda Cultural

![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring-boot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=flat&logo=hibernate&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=postman&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)

---

## 💻 Sobre o projeto

Aplicação fullstack para gerenciamento de eventos culturais. O backend foi desenvolvido em Java com Spring Boot, oferecendo uma API REST com cadastro, listagem e filtragem de eventos por categoria e data, arquitetura em camadas e tratamento de exceções centralizado. O frontend foi desenvolvido com React e TypeScript.

Projeto desenvolvido em equipe durante a faculdade, seguindo metodologia **Scrum**, com rastreabilidade de tarefas e cumprimento de prazos por sprints.

---

## ⚙️ Funcionalidades

- [x] **Cadastro de eventos** — registro de eventos culturais com informações completas
- [x] **Listagem de eventos** — consulta de todos os eventos disponíveis na cidade
- [x] **Filtro por categoria** — filtragem de eventos por tipo (teatro, música, exposição...)
- [x] **Busca por data** — consulta de eventos por período ou data específica
- [x] **Tratamento de exceções** — respostas padronizadas para erros e validações

---

## 🔗 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/eventos` | Cadastrar novo evento |
| `GET` | `/eventos` | Listar todos os eventos |
| `GET` | `/eventos?categoria={categoria}` | Filtrar eventos por categoria |
| `GET` | `/eventos?data={data}` | Buscar eventos por data |

---

## 🏗️ Arquitetura

O projeto foi estruturado seguindo o padrão de camadas:

- **Controller** — recebe as requisições HTTP e retorna as respostas
- **Service** — contém a lógica de negócio e regras da aplicação
- **Repository** — acesso ao banco de dados via Spring Data JPA
- **DTO** — transferência segura e organizada de dados entre as camadas
- **Exception Handler** — tratamento global de erros e validações com respostas padronizadas

---

## 🛠️ Tecnologias e Ferramentas

| Tecnologia | Uso |
|---|---|
| Java | Linguagem principal do backend |
| Spring Boot | Framework para construção da API REST |
| PostgreSQL | Banco de dados relacional |
| JPA / Hibernate | Mapeamento objeto-relacional (ORM) |
| React | Biblioteca para construção do frontend |
| TypeScript | Tipagem estática no frontend |
| Postman | Testes e validação dos endpoints |
| Scrum | Metodologia ágil para gestão do projeto |

---

## 🚀 Como executar o projeto

**Pré-requisitos:** Java 17+, Maven, PostgreSQL

**1. Clone o repositório:**

```bash
git clone https://github.com/cindy197/Agenda-Cultural.git
```

**2. Configure o banco de dados:**

Crie um banco PostgreSQL e configure as credenciais no arquivo `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/agenda_cultural
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
```

**3. Execute o projeto:**

```bash
./mvnw spring-boot:run
```

**4. Teste os endpoints:**

Acesse `http://localhost:8080` e utilize o Postman ou similar para testar os endpoints disponíveis.

---

## 👩‍💻 Desenvolvedora Backend

Responsável pelo desenvolvimento integral do backend: implementação da lógica de negócio, integração com banco de dados, criação dos endpoints e validação com Postman.
