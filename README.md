# Home Base

A smart grocery management application that helps you keep track of products in your fridge and pantry with barcode scanning and expiration date reminders.

⚠️ Warning: this README is a draft completely written by an LLM. It doesn't reflect the final project and could absolutely contain errors. It will be edited in the future. ⚠️

## Overview

**Home Base** is a full-stack web application designed to streamline household inventory management. With barcode scanning capabilities, users can quickly add products to their virtual fridge or pantry, and receive timely reminders when items are approaching their expiration dates. Never waste food again by staying on top of what you have and when it expires.

### Key Features

- 📱 **Barcode Scanning**: Quickly add products by scanning their barcodes
- 🧊 **Fridge & Pantry Management**: Organize products across different storage locations
- 🔔 **Expiration Reminders**: Get notified before items expire
- 🌍 **Multi-language Support**: English and Italian localization included
- 🔐 **User Authentication**: Secure login and registration system
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 💾 **Persistent Storage**: Cloud-based database for your inventory

## Tech Stack

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: AdonisJS 6 (Full-stack framework)
- **Database**: SQL (with migrations support)
- **Authentication**: AdonisJS built-in auth system
- **Middleware**: Custom middleware for auth, localization, and bindings
- **Validation**: Built-in validators for user input

### Frontend

- **Framework**: React 18 with TypeScript
- **SSR/Templating**: Inertia.js for server-side rendering
- **Styling**: CSS with utility functions for theming
- **Build Tool**: Vite for fast development and optimized builds
- **Components**: Reusable React components (Glass Card, Theme Wrapper, etc.)

### DevTools

- **Linting**: ESLint with TypeScript support
- **Formatting**: dprint for code formatting
- **Package Manager**: npm/yarn
- **Development Server**: Hot module reloading with Vite

## Project Structure

```shell
home-base/
├── app/                          # Application logic (backend)
│   ├── controllers/              # Request handlers
│   ├── models/                   # Database models (User, etc.)
│   ├── middleware/               # Custom middleware (auth, localization, etc.)
│   ├── exceptions/               # Global exception handling
│   └── validators/               # Input validation schemas
├── inertia/                      # Frontend (React + Inertia.js)
│   ├── api/                      # Frontend API integration
│   ├── pages/                    # Page components
│   ├── components/               # Reusable UI components
│   ├── styles/                   # CSS files and styling utilities
│   ├── utility/                  # Helper functions and constants
│   └── app.tsx                   # Root React app component
├── config/                       # Application configuration
│   ├── app.ts                    # Core app configuration
│   ├── auth.ts                   # Authentication setup
│   ├── database.ts               # Database configuration
│   ├── session.ts                # Session management
│   ├── i18n.ts                   # Internationalization settings
│   └── ...                       # Other service configurations
├── database/
│   └── migrations/               # Database schema migrations
├── resources/
│   ├── lang/                     # Translation files (en, it)
│   └── views/                    # Edge template files
├── start/                        # Application bootstrap files
│   ├── kernel.ts                 # Middleware registration
│   ├── routes.ts                 # Route definitions
│   └── env.ts                    # Environment setup
├── bin/                          # Executable scripts
│   ├── server.ts                 # Development server entry point
│   ├── console.ts                # REPL and CLI commands
│   └── test.ts                   # Test runner configuration
├── tests/                        # Test files
├── vite.config.ts                # Vite configuration
├── adonisrc.ts                   # AdonisJS configuration
├── eslint.config.ts              # ESLint rules
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts

```

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm** or **yarn**: Package manager
- **Git**: For cloning the repository

### Installation

1. **Clone the repository**

   ```bash
   git clone -b homebase/main https://github.com/Gian518/adonis-blueprint
   cd home-base
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration (database, API keys, etc.)

4. **Generate application key**

   ```bash
   node ace generate:key
   ```

5. **Run database migrations**

   ```bash
   node ace migration:run
   ```

## Running the Application

### Development

Start the development server with hot reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:3333`

### Production Build

Build optimized assets:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production assets
- `npm start` - Start production server
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run format` - Format code with dprint

## Architecture Overview

### Authentication Flow

- Users register/login via the authentication middleware
- Sessions are managed through AdonisJS session system
- Authenticated users can access protected routes

### User Localization

The `detect_user_locale_middleware` automatically detects and set user's language preference, supporting English and Italian out of the box.

### Frontend Architecture

- **Inertia.js** bridges the backend and frontend, allowing server-side routing with client-side reactivity
- **React components** handle UI rendering and user interactions
- **API integration** communicates with backend endpoints for data management

### Database Schema

- User management with secure password hashing
- Product inventory system (structure to be extended)
- Session and authentication tables

## Configuration Files

- **adonisrc.ts**: AdonisJS framework configuration
- **vite.config.ts**: Frontend build and dev server configuration
- **tsconfig.json**: TypeScript compiler settings
- **eslint.config.ts**: Code quality and style rules
- **dprint.json**: Code formatting rules
- **config/**: Service configurations (auth, database, i18n, etc.)

## Internationalization (i18n)

Translation files are located in `resources/lang/`. The application supports:

- **English** (en)
- **Italian** (it)

Add new translations by updating files in the respective language directories.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

### Happy organizing! 🧊📦
