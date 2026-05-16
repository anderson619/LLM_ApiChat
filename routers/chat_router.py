from fastapi import APIRouter

from schemas.chat_schema import InputMessage
from services import chat_service

router = APIRouter()

@router.post("/ai-chat")
def ai_chat(data_in: InputMessage):

    #response = "ok"
    response = chat_service.generate_response(data_in)
    return response
