from sqlalchemy import desc
from sqlalchemy.orm import Session
from app.models.chats import Chat

def read_chat(db: Session, match_id: int):
    db_chat = db.query(Chat).filter(Chat.match_id == match_id).order_by(desc(Chat.created_at)).all()
    return db_chat

def create_chat(
    db: Session, match_id: int, sender_id: int, reciever_id: int, message: str
):
    
    # TODO: Check if the match actually has the sender and reciever ids (user ids) in it
    db_chat = Chat(
        match_id=match_id,
        sender_id=sender_id,
        reciever_id=reciever_id,
        message=message,
    )

    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)

    return db_chat
