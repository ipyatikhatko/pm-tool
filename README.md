# PMTool

Project management tool

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Docker](https://www.docker.com/get-started) installed and running.
- [Node.js](https://nodejs.org/) and [Yarn](https://classic.yarnpkg.com/) installed.
- A valid `NEXTAUTH_SECRET` generated (instructions below).

## Setup

1. Install project dependencies:
   
```bash
yarn install
```
2. Generate a base64-encoded `NEXTAUTH_SECRET`:

```bash
echo -n 'your-secret-value' | base64
```
Replace 'your-secret-value' with your actual secret.

3. Create a .env.local file in the project root and add the following:
```bash
NEXTAUTH_SECRET=base64-encoded-secret
```
Replace base64-encoded-secret with the generated base64-encoded secret from step 2.

4. Start the PostgreSQL database:

```bash
docker-compose up -d db
```

5. Seed the database (if needed):
```bash
yarn seed-db
```
Start the development server:
```bash
yarn dev
```
