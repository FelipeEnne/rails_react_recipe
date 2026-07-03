# Rails React Recipe

Aplicação de receitas com backend **Rails 8** e frontend **React 18**, servida como SPA via **Vite**.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Backend | Ruby 3.2.11, Rails 8.1, Puma 8, PostgreSQL |
| Frontend | React 18, React Router 6, Bootstrap 5, Vite 6 |
| Assets | [vite_rails](https://vite-ruby.netlify.app/) |

## Pré-requisitos

- **Ruby** 3.2.11 (ver [`.ruby-version`](.ruby-version))
- **Bundler** 2.5+
- **Node.js** 18+ e npm
- **PostgreSQL** 12+

No Windows, instale Ruby e adicione ao `PATH` (ex.: `C:\Ruby32-x64\bin`).

## Configuração

```bash
# Dependências Ruby
bundle install

# Dependências JavaScript
npm install

# Banco de dados (ajuste usuário/senha em config/database.yml se necessário)
bundle exec rails db:prepare
```

Em `config/database.yml`, development e test usam `host: localhost`. Se o PostgreSQL exigir autenticação, descomente e preencha `username` e `password`.

## Desenvolvimento

O app precisa de dois processos: Rails (porta 3000) e Vite (porta 3036).

**Terminal 1 — Rails**

```bash
bundle exec rails server
```

**Terminal 2 — Vite**

```bash
bundle exec vite dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Com [Foreman](https://github.com/ddollar/foreman) instalado, use o [`Procfile.dev`](Procfile.dev):

```bash
foreman start -f Procfile.dev
```

## Produção

```bash
npm run build
RAILS_ENV=production bundle exec rails assets:precompile   # compila assets Vite
bundle exec rails db:migrate
bundle exec rails server
```

`config.force_ssl` está habilitado em produção.

## API

| Método | Rota | Ação |
|--------|------|------|
| GET | `/api/v1/recipes/index` | Lista receitas |
| POST | `/api/v1/recipes/create` | Cria receita |
| GET | `/api/v1/show/:id` | Exibe receita |
| DELETE | `/api/v1/destroy/:id` | Remove receita |

Rotas do frontend (`/`, `/recipes`, `/recipe`, `/recipe/:id`) são tratadas pelo `HomepageController` e renderizadas pelo React.

## Estrutura do frontend

```
app/frontend/
├── entrypoints/application.jsx   # ponto de entrada Vite
├── components/                   # React (Home, Recipes, Recipe, NewRecipe)
├── routes/Index.jsx              # React Router
└── styles/application.css        # estilos customizados
```

## Segurança

Auditorias de dependências:

```bash
npm audit
bundle exec bundler-audit check
bundle exec brakeman -q
```

CSP está configurado em `config/initializers/content_security_policy.rb`, com regras extras para o dev server do Vite em development.

## Testes

Ainda não há suíte de testes automatizados. Valide manualmente:

- [ ] `/` — página inicial
- [ ] `/recipes` — listagem
- [ ] `/recipe/:id` — detalhe
- [ ] `/recipe` — criação (POST)
- [ ] Exclusão de receita (DELETE)
