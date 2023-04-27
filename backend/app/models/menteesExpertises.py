from app.db.database import Base
from sqlalchemy import Column, Integer, ForeignKey, Table

mentees_expertises = Table(
    "mentees_expertises",
    Base.metadata,
    Column("mentee_id", Integer, ForeignKey("mentees.id")),
    Column("expertise_id", Integer, ForeignKey("expertises.id")),
)
