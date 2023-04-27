from sqlalchemy import Column, Integer, String, Float, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .base import BaseModel
from .menteesExpertises import mentees_expertises
from .mentoringTypes import MentoringType


class Mentee(BaseModel):
    __tablename__ = "mentees"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    availability = Column(String)
    years_of_experience = Column(Integer)
    mentoring_type = Column(Enum(MentoringType), nullable=True)
    description = Column(String)
    rating = Column(Float)
    linked_in = Column(String)

    expertises = relationship(
        "Expertise", secondary=mentees_expertises, back_populates="mentees"
    )
    user = relationship("User", back_populates="mentee")
    matches = relationship("Match", back_populates="mentee")
