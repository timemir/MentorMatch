from typing import List, Optional
from pydantic import BaseModel
from .expertises import Expertise
from .mentoringTypes import MentoringType
from .timestamps import Timestamps


class MenteeBase(BaseModel):
    availability: Optional[str]
    years_of_experience: Optional[int]
    mentoring_type: MentoringType = "1-on-1"
    description: Optional[str]
    rating: Optional[float]
    linked_in: Optional[str]

    class Config:
        orm_mode = True


class MenteeCreate(BaseModel):
    user_id: int
    mentoring_type: MentoringType = "1-on-1"


class Mentee(MenteeBase):
    id: int
    user_id: int
    expertises: List[Expertise]
    timestamps: Optional[Timestamps]

    class Config:
        orm_mode = True
