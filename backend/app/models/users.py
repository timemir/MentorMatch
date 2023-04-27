from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime,
    func,
    Enum,
    Float,
)
from sqlalchemy.orm import relationship
from .base import BaseModel
from .countries import Country
from .chats import Chat
from enum import Enum as EnumClass


class Gender(str, EnumClass):
    male = "male"
    female = "female"
    diverse = "diverse"


class User(BaseModel):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    email_verified = Column(Boolean, default=False)
    salt = Column(String)
    hashed_password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    gender = Column(Enum(Gender), nullable=True)
    age = Column(Integer, nullable=True)
    bio = Column(String, nullable=True)
    job_title = Column(String, nullable=True)
    company = Column(String, nullable=True)
    country_code = Column(String, nullable=True)
    profile_picture = Column(String, nullable=True)
    is_mentor = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    rating = Column(Float, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    sender_chats = relationship(
        "Chat", back_populates="sender", foreign_keys=[Chat.sender_id]
    )
    receiver_chats = relationship(
        "Chat", back_populates="receiver", foreign_keys=[Chat.reciever_id]
    )
    mentor = relationship("Mentor", back_populates="user")
    mentee = relationship("Mentee", back_populates="user")
