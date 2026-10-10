from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import endpoints
from app.core.database import engine, Base

# Automatically create tables for quick local dev (or use Alembic migrations later)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="LitQueue Backend", version="1.0.0")

# Enable CORS for local React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router, prefix="/api/v1/papers", tags=["papers"])

@app.get("/")
def health_check():
    return {"status": "healthy", "service": "LitQueue API"}