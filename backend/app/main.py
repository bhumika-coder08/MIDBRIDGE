from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

app = FastAPI(title=settings.app_name, version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health", tags=["system"])
def health_check() -> dict[str, str]:
    return {"status": "ok", "environment": settings.environment}


@app.get("/api/dashboard", tags=["dashboard"])
def dashboard() -> dict[str, object]:
    return {
        "applicant": "Bhumika Warke",
        "journey": {"origin": "India", "destination": "Japan", "pathway": "Higher education pathway"},
        "readiness": 68,
        "documents": [
            {"name": "Passport", "detail": "Verified 12 Aug 2026", "status": "Ready", "tone": "ready"},
            {"name": "Academic transcripts", "detail": "Upload required", "status": "Action needed", "tone": "action"},
            {"name": "Proof of funds", "detail": "Valid until 30 Sep 2026", "status": "Ready", "tone": "ready"},
        ],
        "timeline": [
            {"title": "Profile created", "date": "12 Aug 2026", "done": True},
            {"title": "Documents reviewed", "date": "In progress", "done": True},
            {"title": "University application", "date": "Next step", "done": False},
            {"title": "Visa preparation", "date": "Locked until application", "done": False},
        ],
    }
