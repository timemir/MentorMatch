from sqlalchemy.orm import Session
from app.models.certificates import Certificate
from app.api.crud import initial as crud_initial


def get_certificates_by_id(db: Session, certificate_id: int):
    return db.query(Certificate).filter(Certificate.id == certificate_id).first()


def get_certificates(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Certificate).offset(skip).limit(limit).all()


def create_certificates(db: Session):
    crud_initial.load_initial_certificates(db)


def delete_certificates(db: Session):
    db.query(Certificate).delete()
    db.commit()
