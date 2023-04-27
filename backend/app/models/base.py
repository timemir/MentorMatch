from sqlalchemy import Column, DateTime, func
from app.db.database import Base


class BaseModel(Base):
    __abstract__ = True

    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
