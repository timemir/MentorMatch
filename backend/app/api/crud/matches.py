from sqlalchemy.orm import Session, joinedload
from app.models.matches import Match
from app.models.mentors import Mentor
from app.models.mentees import Mentee
from app.models.users import User
from app.schemas.matches import StatusType


def place_match(db: Session, mentor_id: int, mentee_id: int):
    db_match = Match(
        mentor_id=mentor_id,
        mentee_id=mentee_id,
        mentoring_type="1-on-1",
        status="pending",
    )
    db.add(db_match)
    db.commit()
    db.refresh(db_match)
    return db_match


# WIP
def update_match_status(db: Session, match_id: int, status: StatusType):
    db_match = db.get(Match, match_id)
    db_match.status = status

    db.add(db_match)
    db.commit()
    db.refresh(db_match)
    return db_match


def get_matches(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    # Get matches where user is mentor

    mentor_matches = (
        db.query(Match)
        .join(Mentor, Match.mentor_id == Mentor.id)
        .join(User, Mentor.user_id == User.id)
        .options(joinedload(Match.mentee).joinedload(Mentee.user))
        .filter(Mentor.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )

    # Get matches where user is mentee
    mentee_matches = (
        db.query(Match)
        .join(Mentee, Match.mentee_id == Mentee.id)
        .join(User, Mentee.user_id == User.id)
        .options(joinedload(Match.mentor).joinedload(Mentor.user))
        .filter(Mentee.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )

    # Combine both queries and return results

    return {"matches_as_mentor": mentor_matches, "matches_as_mentee": mentee_matches}


def get_match_by_id(db: Session, match_id: int):
    return db.query(Match).filter(Match.id == match_id).first()


def find_open_mentors(db: Session):
    return db.query(Mentor).filter(Mentor.matches == None).all()
