from typing import List, Optional
from pydantic import BaseModel
from .timestamps import Timestamps


class MentorExpertise(BaseModel):
    mentor_id: int
    expertise_id: int
    timestamps: Optional[Timestamps]
