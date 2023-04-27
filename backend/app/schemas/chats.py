from pydantic import BaseModel, ForeignKey
from .timestamps import Timestamps
from typing import Optional


class ChatBase(BaseModel):
    match_id: int = ForeignKey("matches.id")
    sender_id: int = ForeignKey("users.id")
    reciever_id: int = ForeignKey("users.id")
    message: str


class ChatCreate(ChatBase):
    pass


class Chat(ChatBase):
    id: int
    timestamps: Optional[Timestamps]

    class Config:
        orm_mode = True
