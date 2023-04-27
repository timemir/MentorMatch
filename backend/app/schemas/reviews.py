from pydantic import BaseModel, Field, ForeignKey
from typing import Optional
from .timestamps import Timestamps


class ReviewBase(BaseModel):
    match_id: int = ForeignKey("matches.id")
    reviewer_id: int = ForeignKey("users.id")
    reviewee_id: int = ForeignKey("users.id")
    rating: float = Field(ge=1.0, le=5.0)
    review: Optional[str]


class ReviewCreate(ReviewBase):
    pass


class Review(ReviewBase):
    id: int
    timestamps: Optional[Timestamps]

    class Config:
        orm_mode = True
