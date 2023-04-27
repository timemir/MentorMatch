from typing import List, Optional
from pydantic import BaseModel
from .timestamps import Timestamps


class ExpertiseBase(BaseModel):
    id: str
    name: str


class ExpertiseCreate(ExpertiseBase):
    pass


class Expertise(ExpertiseBase):
    timestamps: Optional[Timestamps]

    class Config:
        orm_mode = True
