from sqlalchemy.orm import Session
from app.models.users import User
from app.models.mentees import Mentee
from app.schemas.users import UserCreate, UserUpdate, UserOnboard
from app.schemas.mentees import MenteeCreate
from app.api.crud import mentees as crud_mentee
from app.models.mentors import Mentor
from app.schemas.mentors import MentorCreate
from app.api.crud import mentors as crud_mentor
from fastapi import HTTPException


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = User(
        email=user.email,
        hashed_password=fake_hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = db.get(User, user_id)
    updated_user_data = user.dict(exclude_unset=True)

    for key, value in updated_user_data.items():
        setattr(db_user, key, value)

    if user.is_mentor == False:
        if db.query(Mentee).filter(Mentee.user_id == user_id).first():
            raise HTTPException(status_code=401, detail="Mentee already found")
        else:
            mentee = MenteeCreate
            crud_mentee.create_mentee(db=db, user_id=user_id, mentee=mentee)
    else:
        if db.query(Mentor).filter(Mentor.user_id == user_id).first():
            raise HTTPException(status_code=401, detail="Mentor already found")
        else:
            mentor = MentorCreate
            crud_mentor.create_mentor(db=db, user_id=user_id, mentor=mentor)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_users(db: Session):
    db.query(User).delete()
    db.commit()


def onboard_user(db: Session, user_id: int, user: UserOnboard):
    db_user = db.query(User).filter(User.id == user_id).one()

    db_user.first_name = user.first_name or db_user.first_name
    db_user.last_name = user.last_name or db_user.last_name
    db_user.profile_picture = user.profile_picture or db_user.profile_picture
    db_user.bio = user.bio or db_user.bio
    db_user.job_title = user.job_title or db_user.job_title
    db_user.company = user.company or db_user.company
    db_user.country_code = user.country_code or db_user.country_code
    db_user.is_mentor = user.is_mentor

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
