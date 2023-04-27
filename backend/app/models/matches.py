from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import BaseModel
from .mentoringTypes import MentoringType
from enum import Enum
from .chats import Chat
from sqlalchemy.dialects.postgresql import ENUM


class StatusType(Enum):
    pending = "pending"
    active = "active"
    ended = "ended"
    rejected = "rejected"


class Match(BaseModel):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    mentor_id = Column(Integer, ForeignKey("mentors.id"))
    mentee_id = Column(Integer, ForeignKey("mentees.id"))
    status = Column(String, nullable=True)
    start_date = Column(DateTime, default=func.now())
    end_date = Column(DateTime, nullable=True)
    mentoring_type = Column(ENUM(MentoringType), nullable=True)
    schedule = Column(String)

    mentor = relationship("Mentor", back_populates="matches")
    mentee = relationship("Mentee", back_populates="matches")
    chat = relationship("Chat", back_populates="match")
