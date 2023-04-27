from app.db.database import Base
from sqlalchemy import Column, Integer, Table, ForeignKey

mentors_certificates = Table(
    "mentors_certificates",
    Base.metadata,
    Column("mentor_id", Integer, ForeignKey("mentors.id")),
    Column("certificate_id", Integer, ForeignKey("certificates.id")),
)
