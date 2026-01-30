from fastapi import APIRouter
from .v1.users import router as user_router

router = APIRouter()
router.include_router(user_router)