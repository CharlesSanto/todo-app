# Todo API - Backend

API REST para gerenciamento de tarefas (Todos), desenvolvida em **.NET 8 Minimal API**.  
Este módulo representa **exclusivamente o backend** da aplicação, dentro de uma arquitetura **monorepo**.

## Tecnologias

- .NET 8
- ASP.NET Core Minimal API
- Entity Framework Core
- PostgreSQL
- JWT
- FluentValidation
- Swagger / OpenAPI

## Funcionalidades

- Registro e autenticação de usuários
- Autenticação JWT (Bearer Token)
- Isolamento de dados por usuário autenticado
- CRUD de tarefas (Todos)
- CRUD de tags
- Validações de entrada com FluentValidation

## Endpoints

### Públicos

| Método | Rota | Descrição |
|------|------|-----------|
| POST | `/users` | Registro de usuário |
| POST | `/login` | Autenticação (retorna token JWT) |

### Protegidos

#### Usuários
| Método | Rota |
|------|------|
| GET | `/users/me` |
| PATCH | `/users` |
| DELETE | `/users` |

#### Todos
| Método | Rota |
|------|------|
| GET | `/todos` |
| GET | `/todos/{id}` |
| POST | `/todos` |
| PATCH | `/todos/{id}` |
| DELETE | `/todos/{id}` |

#### Tags
| Método | Rota |
|------|------|
| GET | `/tags` |
| POST | `/tags` |
| PATCH | `/tags/{tagId}` |
| DELETE | `/tags/{tagId}` |

### JWT Key

A chave JWT deve ser configurada via **User Secrets**.

```sh
dotnet user-secrets set "Jwt:Key" "sua-chave-secreta-com-pelo-menos-32-caracteres"

