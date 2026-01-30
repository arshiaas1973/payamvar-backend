from fastapi import APIRouter
from fastapi.responses import Response,JSONResponse
from fastapi.requests import Request

router = APIRouter(prefix="/api/v1/users")

@router.get('/')
def index_user(response: Response):
    return JSONResponse(content={"status":"success"},status_code=200)