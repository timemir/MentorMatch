from app.db.database import Base
from sqlalchemy import Column, Integer, Table, ForeignKey

mentors_expertises = Table(
    "mentors_expertises",
    Base.metadata,
    Column("mentor_id", Integer, ForeignKey("mentors.id")),
    Column("expertise_id", Integer, ForeignKey("expertises.id")),
)
