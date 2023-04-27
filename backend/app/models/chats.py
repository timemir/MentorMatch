from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .base import BaseModel


class Chat(BaseModel):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"))
    sender_id = Column(Integer, ForeignKey("users.id"))
    reciever_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String)

    match = relationship("Match", back_populates="chat")
    sender = relationship(
        "User", back_populates="sender_chats", foreign_keys=[sender_id]
    )
    receiver = relationship(
        "User", back_populates="receiver_chats", foreign_keys=[reciever_id]
    )
