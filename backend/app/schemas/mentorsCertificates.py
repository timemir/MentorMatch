from typing import List, Optional
from pydantic import BaseModel
from .timestamps import Timestamps


class MentorCertificate(BaseModel):
    mentor_id: int
    certificate_id: int
    timestamps: Optional[Timestamps]
