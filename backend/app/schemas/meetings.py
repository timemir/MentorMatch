from pydantic import BaseModel, Field, ForeignKey
from datetime import datetime
from typing import Optional
from .timestamps import Timestamps


class MeetingBase(BaseModel):
    match_id: int = ForeignKey("matches.id")
    mentor_id: int = ForeignKey("mentors.id")
    mentee_id: int = ForeignKey("mentees.id")
    start_time: datetime
    end_time: datetime
    location: Optional[str]
    notes: Optional[str]
    status: str = Field(default="scheduled")


class MeetingCreate(MeetingBase):
    pass


class Meeting(MeetingBase):
    id: int
    timestamps: Optional[Timestamps]

    class Config:
        orm_mode = True
