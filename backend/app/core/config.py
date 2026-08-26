from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "MEDBRIDGE API"
    environment: str = "development"
    database_url: str = "postgresql+psycopg://medbridge:medbridge_dev_password@localhost:5432/medbridge"
    jwt_secret: str = "development-only-secret-change-before-deployment"

    model_config = SettingsConfigDict(env_file=".env", env_prefix="MEDBRIDGE_")


settings = Settings()
