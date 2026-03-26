# AdonisJS Blueprint (Monorepo Base)

Boilerplate project for full-stack applications based on **AdonisJS** with a React/Inertia front-end, designed to serve as the base branch in a monorepo. Includes structure, configurations, and standard workflows for development, testing, and deployment.

⚠️ Warning: this README is a draft completely written by an LLM. It doesn't reflect the final project and could absolutely contain errors. It will be edited in the future. ⚠️

## Description

This repository is intended as a generic starting point for AdonisJS projects. It is ideal for product lines that share a common core and want to reduce initial setup with a ready-to-use template.

### Goals

- Base for AdonisJS projects (server + API)
- React front-end integration with Inertia.js
- Dev/test/CI workflow already configured
- Monorepo-friendly convention with a shared "base" branch

## Tech Stack

- Node.js + TypeScript
- AdonisJS (version 6 or later)
- React + Inertia.js
- Vite for frontend
- SQL Database (SQLite/PostgreSQL/MySQL)
- Lucid ORM
- Authentication via Adonis auth
- ESLint + dprint for quality and formatting

## File Structure

- `app/`: backend logic (controllers, models, middleware, validators)
- `config/`: Adonis configurations (app, auth, db, etc.)
- `start/`: framework bootstrap (routes, kernel, env)
- `database/migrations/`: schema migrations
- `resources/lang/`: localizations
- `resources/views/`: Edge templates
- `inertia/`: React + Inertia front-end
- `tests/`: test suite
- `bin/`: utility scripts (server, console, test)
- `adonisrc.ts`, `package.json`, `tsconfig.json`: project setup

## Initial Setup

1. Clone:

```bash
git clone https://github.com/Gian518/adonis-blueprint Adonis Blueprint
cd project-name
```

2. Install dependencies:

```bash
npm ci
```

3. Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

4. Generate app key:

```bash
node ace generate:key
```

5. Run migrations:

```bash
node ace migration:run
```

6. (Optional) Seed initial 

```bash
node ace db:seed
```

## Useful Commands

- `npm run dev`: starts Adonis + React/Inertia server in dev mode
- `npm run build`: compiles assets for production
- `npm run start`: starts server in production mode
- `npm run lint`: runs ESLint
- `npm run format`: runs dprint
- `npm run test`: runs test suite
- `node ace migration:run`: run DB migrations
- `node ace migration:rollback`: rollback migrations
- `node ace make:controller <Name>`: generate controller
- `node ace make:model <Name> -m`: generate model + migration

## Main Configurations

- `config/app.ts`: base application options
- `config/database.ts`: DB connection (driver, pool, migrations)
- `config/auth.ts`: providers and guards
- `config/session.ts`: session store
- `config/i18n.ts`: languages and fallback
- `adonisrc.ts`: bootstrap path and providers
- `vite.config.ts`: React/Inertia build

## Recommended Development Flow

1. Create branch from `main` or `base`:
   - `git checkout -b feature/<description>`
2. Implement feature + tests
3. Run:
   - `npm run lint`
   - `npm run test`
4. Commit and push
5. Open PR with description and checklist

## Internationalization

- `resources/lang/en/`, `resources/lang/it/`
- Add modular translations in new YAML/JSON files
- Use `t()` helper in backend and i18n hooks in frontend

## Authentication and Middleware

- `app/Middleware/auth_middleware.ts`: route protection
- `app/Middleware/guest_middleware.ts`: anonymous routes
- `app/Middleware/detect_user_locale_middleware.ts`: user locale detection

## Route Examples in `start/routes.ts`

- `/` or `/dashboard` (authenticated)
- `/login`, `/register`, `/logout`
- `/api/*` for REST interfaces

## Monorepo Notes

- This project is the shared "core"
- Other packages may exist in the same repository (e.g. `packages/*`)
- Keep Adonis version compatibility and common scripts in sync

## License

MIT

---

⚡ This README is intended as a base document to get started immediately with a new AdonisJS project in a monorepo.
