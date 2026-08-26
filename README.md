# MEDBRIDGE

**Your Documents. Your Journey. Your Trust.**

MEDBRIDGE is a cross-border digital mobility platform. This repository currently contains only its development foundation—no real government, embassy, university, or issuer integrations are included.

## First demo journey

`India → Japan → Higher Education`

All data used during development will be fictional and any connector will be visibly labelled **DEMO/SIMULATED**.

## Repository layout

- `frontend/` — React, TypeScript, Vite, Tailwind application
- `backend/` — FastAPI service and future domain modules
- `database/` — local PostgreSQL development setup
- `docs/` — architecture and implementation notes

## Run the backend (after dependencies are installed)

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```

Then open `http://127.0.0.1:8000/health`.

## Run the frontend (after Node.js 20+ is installed)

```powershell
cd frontend
npm install
npm run dev
```

## Local PostgreSQL

With Docker Desktop installed and running:

```powershell
docker compose up -d db
```

The default development credentials are deliberately local-only and are defined in `.env.example` files. Change them before any non-local deployment.
