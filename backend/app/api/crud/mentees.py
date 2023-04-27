from sqlalchemy.orm import Session
from app.models.mentees import Mentee
from app.schemas.mentees import MenteeBase


def get_mentees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Mentee).offset(skip).limit(limit).all()


def get_mentees_by_id(db: Session, mentee_id: int):
    return db.query(Mentee).filter(Mentee.id == mentee_id).first()


def get_mentee_by_user_id(db: Session, user_id: int):
    return db.query(Mentee).filter(Mentee.user_id == user_id).first()


def create_mentee(db: Session, user_id: int):
    db_mentee = Mentee(user_id=user_id, mentoring_type="1-on-1")
    db.add(db_mentee)
    db.commit()
    db.refresh(db_mentee)
    return db_mentee


def update_mentee(db: Session, user_id: int, mentee: MenteeBase):
    db_mentee = db.get(Mentee, user_id)
    updated_user_data = mentee.dict(exclude_unset=True)

    for key, value in updated_user_data.items():
        setattr(db_mentee, key, value)

    db.add(db_mentee)
    db.commit()
    db.refresh(db_mentee)
    return db_mentee

def read_expertises_mentee(db: Session, mentee_id: int):
    mentee = db.query(Mentee).filter(Mentee.id == mentee_id).first()

    # Get the expertises associated with the mentee
    expertises = mentee.expertises

    # Return the expertises as a list of dictionaries
    return [{"id": expertise.id, "name": expertise.name} for expertise in expertises]