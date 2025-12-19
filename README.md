# 📊 Sistema de Controle de Gastos Residencial

Este projeto tem como objetivo gerenciar **pessoas, receitas, despesas e saldos**.
A aplicação é composta por **Back-end (API REST)** e **Front-end (Web)**.

---

## 🧠 Visão Geral da Arquitetura

O sistema segue uma arquitetura **cliente-servidor**, onde:

* O **Back-end** é responsável pelas regras de negócio, persistência de dados e disponibilização de endpoints REST.
* O **Front-end** consome esses endpoints e apresenta as informações de forma visual e interativa ao usuário.

A comunicação entre as camadas ocorre via **HTTP**, utilizando **JSON** como formato de troca de dados.

---

## ⚙️ Tecnologias Utilizadas — Back-end

O Back-end foi desenvolvido utilizando a plataforma **.NET**, seguindo boas práticas de organização, separação de responsabilidades e escalabilidade.

### 🔹 Linguagem e Plataforma

* **C#**
* **.NET 8**
* **ASP.NET Core Web API**

---

### 🔹 Arquitetura e Padrões

* **API RESTful**
* **DTO (Data Transfer Object)** para transporte de dados
* **Injeção de Dependência**
* **Separação em camadas** (Controllers, Services, Repositories)

---

### 🔹 Persistência de Dados

* **Entity Framework Core**
* **MySql**

O Entity Framework Core é utilizado como ORM, simplificando o mapeamento entre objetos e tabelas do banco de dados.

---

### 🔹 Outros Recursos

* **LINQ** para consultas
* **Swagger / OpenAPI** para documentação dos endpoints
* **Tratamento de exceções** centralizado
* **CORS** configurado para comunicação com o Front-end

---

## 🎨 Tecnologias Utilizadas — Front-end

O Front-end foi desenvolvido como uma **Single Page Application (SPA)**, priorizando experiência do usuário, organização do código e reutilização de componentes.

---

### 🔹 Linguagem e Framework

* **TypeScript**
* **React**

O uso do TypeScript garante maior segurança no desenvolvimento, enquanto o React facilita a construção de interfaces reutilizáveis e reativas.

---

### 🔹 Gerenciamento de Estado e Lógica

* **React Hooks**

  * `useState`
  * `useEffect`
  * Hooks personalizados (`usePessoas`, `useLoading`, etc.)

Esses hooks permitem separar regras de negócio da camada de apresentação.

---

### 🔹 Comunicação com a API

* **Axios**

Utilizado para realizar requisições HTTP ao Back-end, com configuração centralizada da base da API.

---

### 🔹 Interface e Estilo

* **Bootstrap**
* **React-Bootstrap**
* **Lucide React (ícones)**

Essas bibliotecas aceleram o desenvolvimento da interface e garantem um visual limpo e responsivo.

---

### 🔹 Feedback ao Usuário

* **React Toastify**

Utilizado para exibir mensagens de sucesso e erro (toasts), melhorando a experiência do usuário durante operações como inclusão e exclusão de dados.

---

### 🔹 Organização do Projeto

* **Components**: componentes reutilizáveis
* **Pages**: páginas principais do sistema
* **Hooks**: lógica reutilizável
* **Services**: comunicação com a API
* **Utils**: funções auxiliares (ex.: formatação de moeda)
* **Types**: tipagens TypeScript (DTOs)

---
