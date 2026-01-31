# Todo App Frontend

Este é o frontend do Todo App, desenvolvido em React com Vite, Tailwind CSS e integração com uma API backend.

## Funcionalidades

- Autenticação de usuário (login, cadastro, logout)
- CRUD de tarefas (criar, listar, editar, excluir)
- Atualização otimista e cache local
- Filtros: Hoje, Em breve, Concluídas, Estatísticas
- Marcação de prioridade e datas
- Interface responsiva (mobile/desktop)
- Tema claro/escuro
- Sidebar com navegação
- Feedback visual com loading/spinner

## Estrutura de Pastas

```
frontend/
  public/
  src/
    assets/           # Imagens e ícones
    components/       # Componentes reutilizáveis (Sidebar, TodoItem, etc)
    context/          # Contexto de autenticação
    pages/            # Páginas principais (TodoPage, LoginPage, etc)
    services/         # Serviços de API (todoService, authService, etc)
    utils/            # Utilitários e helpers
  index.html
  package.json
  tailwind.config.js
  vite.config.js
```

## Instalação e Execução

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse em [http://localhost:5173](http://localhost:5173)

> Certifique-se de que o backend está rodando e configurado para aceitar requisições do frontend.

## Configuração

- As URLs da API estão em `src/services/*.js`.
- Variáveis de ambiente podem ser configuradas em `.env` se necessário.

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera build de produção
- `npm run preview` — Visualiza build de produção localmente

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
