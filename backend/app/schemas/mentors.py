from typing import List, Optional
from pydantic import BaseModel
from .expertises import Expertise
from .certificates import Certificate
from .mentoringTypes import MentoringType
from .timestamps import Timestamps


class MentorBase(BaseModel):
    availability: Optional[str]
    years_of_experience: Optional[int]
    mentoring_type: Optional[MentoringType]
    description: Optional[str]
    rating: Optional[float]
    linked_in: Optional[str]


class MentorCreate(MentorBase):
    user_id: int


class Mentor(MentorBase):
    id: int
    user_id: int
    expertises: List[Expertise]
    certificates: List[Certificate]
    timestamps: Optional[Timestamps]

    class Config:
        orm_mode = True
