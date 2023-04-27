from sqlalchemy import Column, Integer, String, Float, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .base import BaseModel
from .mentorsCertificates import mentors_certificates
from .mentorsExpertises import mentors_expertises
from .mentoringTypes import MentoringType


class Mentor(BaseModel):
    __tablename__ = "mentors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    availability = Column(String)
    years_of_experience = Column(Integer)
    mentoring_type = Column(Enum(MentoringType), nullable=False)
    description = Column(String)
    rating = Column(Float)
    linked_in = Column(String)

    expertises = relationship(
        "Expertise", secondary=mentors_expertises, back_populates="mentors"
    )
    certificates = relationship(
        "Certificate", secondary=mentors_certificates, back_populates="mentors"
    )
    user = relationship("User", back_populates="mentor")
    matches = relationship("Match", back_populates="mentor")
