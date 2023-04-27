from fastapi import APIRouter, Body, Depends, HTTPException
from app.db.session import Session, get_db

import app.api.crud.chats as crud_chats


router = APIRouter()

@router.get("/chats/{match_id}")
def get_chat(
    match_id: int,
    db: Session = Depends(get_db),
):
  return crud_chats.read_chat(db, match_id=match_id)


@router.post("/chats/add")
def add_to_chat(
    match_id: int = Body(..., embed=True),
    sender_id: int = Body(..., embed=True),
    reciever_id: int = Body(..., embed=True),
    message: str = Body(..., embed=True),
    db: Session = Depends(get_db),
):
  db_chat = crud_chats.create_chat(db, match_id, sender_id, reciever_id, message)
  
  if not db_chat:
    return HTTPException(status_code=400, detail="Chat not created")
  
  return db_chat 
