from sqlalchemy import Column, Integer, String
from .base import BaseModel
from .mentorsCertificates import mentors_certificates
from sqlalchemy.orm import relationship


class Certificate(BaseModel):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    mentors = relationship(
        "Mentor", secondary=mentors_certificates, back_populates="certificates"
    )
