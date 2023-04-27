from typing import Optional
from pydantic import BaseModel
from sqlalchemy import ForeignKey
from datetime import datetime as datetime
from .mentoringTypes import MentoringType
from enum import Enum
from .timestamps import Timestamps
from app.models.matches import StatusType


class StatusType(str, Enum):
    pending = "pending"
    active = "active"
    ended = "ended"
    rejected = "rejected"


class MatchBase(BaseModel):
    mentor_id: int = ForeignKey("mentors.id")
    mentee_id: int = ForeignKey("mentees.id")
    chat_id: int = ForeignKey("chats.id")
    status: StatusType
    start_date: datetime
    end_date: Optional[datetime]
    mentoring_type: MentoringType
    schedule: str

    class Config:
        orm_mode = True


class MatchCreate(BaseModel):
    mentor_id: int
    mentee_id: int
    mentoring_type: MentoringType = "1-on-1"
    status: StatusType = "pending"

    class Config:
        orm_mode = True


class Match(MatchBase):
    id: int
    timestamps: Optional[Timestamps]

    class Config:
        orm_mode = True
