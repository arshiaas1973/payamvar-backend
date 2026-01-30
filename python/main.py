from fastapi import FastAPI, APIRouter
from routes import router
from dotenv import load_dotenv,find_dotenv

load_dotenv(find_dotenv('.env'),override=True)

from config.settings import settings

app = FastAPI(title=settings.APP_NAME,debug=settings.DEBUG)
app.include_router(router)