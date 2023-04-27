from sqlalchemy.orm import Session
from app.models.expertises import Expertise
from app.api.crud import initial as crud_initial


def get_expertises_by_id(db: Session, expertise_id: int):
    return (
        db.query(Expertise.id, Expertise.name)
        .filter(Expertise.id == expertise_id)
        .first()
    )


def get_expertises(db: Session, skip: int, limit: int):
    query = db.query(Expertise.id, Expertise.name).order_by(Expertise.name).offset(skip)
    if limit is not None:
        query = query.limit(limit)

    return query.all()


def create_expertises(db: Session):
    crud_initial.load_initial_expertises(db)


def delete_expertises(db: Session):
    db.query(Expertise).delete()
    db.commit()
