from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from app.models.mentors import Mentor
from app.models.users import User
from app.schemas.mentors import MentorBase


def get_mentors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Mentor).offset(skip).limit(limit).all()


def get_mentor_by_id(db: Session, mentor_id: int):
    return db.query(Mentor).filter(Mentor.id == mentor_id).first()


def get_mentor_by_user_id(db: Session, user_id: int):
    return db.query(Mentor).filter(Mentor.user_id == user_id).first()


def create_mentor(db: Session, user_id: int):
    db_mentor = Mentor(user_id=user_id, mentoring_type="1-on-1")
    db.add(db_mentor)
    db.commit()
    db.refresh(db_mentor)
    return db_mentor


def update_mentor(db: Session, user_id: int, mentee: MentorBase):
    db_mentor = db.get(Mentor, user_id)
    updated_user_data = Mentor.dict(exclude_unset=True)

    for key, value in updated_user_data.items():
        setattr(db_mentor, key, value)

    db.add(db_mentor)
    db.commit()
    db.refresh(db_mentor)
    return db_mentor


def get_mentors_and_users(
    db: Session, search_query: dict, skip: int = 0, limit: int = 100
):
    search_conditions = []

    if search_query.get("user_input"):
        search_conditions.append(
            or_(
                User.first_name.ilike(f"%{search_query['user_input']}%"),
                User.last_name.ilike(f"%{search_query['user_input']}%"),
                User.bio.ilike(f"%{search_query['user_input']}%"),
                User.job_title.ilike(f"%{search_query['user_input']}%"),
                User.company.ilike(f"%{search_query['user_input']}%"),
            )
        )

    if search_query.get("expertise_id"):
        search_conditions.append(Mentor.expertises.any(id=search_query["expertise_id"]))

    if search_query.get("country_id"):
        search_conditions.append(User.country_code == search_query["country_id"])

    if search_query.get("level_id"):
        level_condition = get_level_condition(search_query["level_id"])
        if level_condition is not None:
            search_conditions.append(level_condition)

    combined_data_query = db.query(User, Mentor).join(Mentor, User.id == Mentor.user_id)

    if search_conditions:
        combined_data_query = combined_data_query.filter(and_(*search_conditions))

    combined_data = combined_data_query.offset(skip).limit(limit).all()

    result = []
    for user, mentor in combined_data:
        user_dict = user.__dict__
        mentor_dict = mentor.__dict__
        if "_sa_instance_state" in user_dict:
            del user_dict["_sa_instance_state"]
        if "_sa_instance_state" in mentor_dict:
            del mentor_dict["_sa_instance_state"]
        combined_dict = {**user_dict, **mentor_dict}
        result.append(combined_dict)

    return result

def get_mentors_for_matching(db: Session):
    result = db.query(User, Mentor).join(Mentor, User.id == Mentor.user_id).all()

    mentors_with_users = []
    for user, mentor in result:
        user_dict = {c.name: getattr(user, c.name) for c in user.__table__.columns}
        mentor_dict = {c.name: getattr(mentor, c.name) for c in mentor.__table__.columns}
        mentor_with_user = {**mentor_dict, "user": user_dict}
        mentors_with_users.append(mentor_with_user)

    return mentors_with_users

def read_expertises_mentor(db: Session, mentor_id: int):
    mentor = db.query(Mentor).filter(Mentor.id == mentor_id).first()

    # Get the expertises associated with the mentor
    expertises = mentor.expertises

    # Return the expertises as a list of dictionaries
    return [{"id": expertise.id, "name": expertise.name} for expertise in expertises]


def get_level_condition(level_id: int):
    if level_id == 1:
        return and_(Mentor.years_of_experience >= 0, Mentor.years_of_experience <= 1)
    elif level_id == 2:
        return and_(Mentor.years_of_experience >= 2, Mentor.years_of_experience <= 4)
    elif level_id == 3:
        return and_(Mentor.years_of_experience >= 5, Mentor.years_of_experience <= 6)
    elif level_id == 4:
        return and_(Mentor.years_of_experience >= 7, Mentor.years_of_experience <= 9)
    elif level_id == 5:
        return Mentor.years_of_experience >= 10
    else:
        return None
