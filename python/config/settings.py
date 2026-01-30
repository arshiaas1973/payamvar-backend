from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class PostgresSettings(BaseSettings):
    POSTGRES_USER: str = os.getenv("POSTGRES_USER") or "user"
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD") or "password"
    POSTGRES_DB: str = os.getenv("POSTGRES_DB") or "database"
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST") or "localhost"
    POSTGRES_PORT: int = os.getenv("POSTGRES_PORT") or 5432
    
    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )
    

class ScyllaSettings(BaseSettings):
    SCYLLA_NODES: List[str] = ["127.0.0.1"]
    SCYLLA_KEYSPACE: str = os.getenv("SCYLLA_KEYSPACE") or "keyspace"
    SCYLLA_USER: Optional[str] = os.getenv("SCYLLA_USER")
    SCYLLA_PASSWORD: Optional[str] = os.getenv("SCYLLA_PASSWORD")

class Settings(BaseSettings):
    APP_NAME: str = os.getenv("APP_NAME") or "FastAPI"
    DEBUG: bool = os.getenv("DEBUG")
    
    postgres: PostgresSettings = PostgresSettings()
    scylla: ScyllaSettings = ScyllaSettings()

settings = Settings()