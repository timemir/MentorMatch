from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .base import BaseModel


class Review(BaseModel):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"))
    reviewer_id = Column(Integer, ForeignKey("users.id"))
    reviewee_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Float(precision=2), nullable=False)
    review = Column(String, nullable=True)

    reviewer = relationship(
        "User", foreign_keys=[reviewer_id], backref="reviewer_reviews"
    )
    reviewee = relationship(
        "User", foreign_keys=[reviewee_id], backref="reviewee_reviews"
    )
