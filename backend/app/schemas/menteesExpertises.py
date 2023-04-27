from typing import List, Optional
from pydantic import BaseModel, ForeignKey
from .timestamps import Timestamps


class MenteeExpertise(BaseModel):
    mentee_id: int = ForeignKey("mentees.id")
    expertise_id: int = ForeignKey("expertises.id")
    timestamps: Optional[Timestamps]
