from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "MEDBRIDGE API"
    environment: str = "development"
    database_url: str = "postgresql+psycopg://medbridge:medbridge_dev_password@localhost:5432/medbridge"
    jwt_secret: str = "development-only-secret-change-before-deployment"
    cors_origins: list[str] = [
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ]

    model_config = SettingsConfigDict(
        env_file=str(Path(__file__).resolve().parents[1] / ".env"),
        env_prefix="MEDBRIDGE_",
        case_sensitive=False,
        extra="ignore",
    )


settings = Settings()
