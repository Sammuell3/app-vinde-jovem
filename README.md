# App Movimento Vinde Jovem

Aplicação web desenvolvida para o gerenciamento de grupos de jovens, inspirado no Movimento Vinde Jovem da Igreja Católica.

## 🛠 Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução Javascript.
- **Express**: Framework para construção da API.
- **MongoDB**: Banco de dados NoSQL (utilizando **Mongoose**).
- **JWT**: Para autenticação e segurança.

### Frontend
- **Vue.js 3**: Framework progressivo para construção da interface.
- **Vite**: Build tool rápida e leve.
- **TailwindCSS**: Framework de utilitários CSS para estilização.
- **Pinia**: Gerenciamento de estado intuitivo para Vue.
- **Vue Router**: Roteamento oficial para Single Page Applications.

## 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- **Node.js** (Recomendado versão 20 ou superior)
- **MongoDB** (Local ou Atlas URI)

## 🚀 Instalação e Execução

Clone o repositório e siga os passos abaixo para cada parte da aplicação.

### Configurando o Backend

1. Acesse o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz da pasta `backend` e defina as variáveis necessárias (exemplo abaixo):
   ```env
   PORT=8000
   DATABASE_URI=mongodb://localhost:27017/vinde-jovem
   JWT_SECRET=vossa_chave_secreta_aqui
   ```

4. Execute o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   O servidor iniciará na porta definida (padrão 8000).

### Configurando o Frontend

1. Em um novo terminal, acesse o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto:
   ```bash
   npm run dev
   ```
   O vite irá expor a aplicação (geralmente em `http://localhost:5173`).

## 📂 Estrutura do Projeto

- **backend/**: Contém a lógica da API, modelos do banco de dados e controladores.
- **frontend/**: Contém os componentes Vue, páginas e estilos da aplicação.
