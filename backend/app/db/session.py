from sqlalchemy.orm import Session

from app.models.base import Base
from app.db.database import SessionLocal, engine
# Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
