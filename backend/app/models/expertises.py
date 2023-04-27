from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import BaseModel
from .menteesExpertises import mentees_expertises
from .mentorsExpertises import mentors_expertises


class Expertise(BaseModel):
    __tablename__ = "expertises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    mentees = relationship(
        "Mentee", secondary=mentees_expertises, back_populates="expertises"
    )
    mentors = relationship(
        "Mentor", secondary=mentors_expertises, back_populates="expertises"
    )
