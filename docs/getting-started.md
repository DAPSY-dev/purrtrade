# Getting started

## Prerequisites

- Node.js: `v20.18.0`

## Installation and setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create `.env.local`, `.env.test`, and `.env` from `.env.example`.

3. Migrate database:

   ```sh
   npm run db:migrate
   ```

4. Generate database client:

   ```sh
   npm run db:generate
   ```

## Common scripts

View database:

```sh
npm run db:viewer
```

Start in development mode:

```sh
npm run dev
```

Run tests:

```sh
npm run test
```

Create an optimized production build:

```sh
npm run build
```

Start in production mode:

```sh
npm start
```

Run ESLint:

```sh
npm run lint
```

Run favicon check:

> Start the application in production mode before running favicon check.

```sh
npm run faviconCheck
```
