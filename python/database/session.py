from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine, AsyncSession
from python.config.settings import settings

DATABASE_URL = settings.postgres.DATABASE_URL

engine = create_async_engine(
    DATABASE_URL,
    echo=settings.DEBUG,
    future=True,
)

AsyncLocalSession = async_sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
    class_=AsyncSession
)

async def get_db():
    async with AsyncLocalSession() as session:
        yield session