from sqlalchemy.orm import Session
from app.models.mentorsCertificates import mentors_certificates
from app.api.crud.mentors import get_mentor_by_id
from app.api.crud.certificates import get_certificates_by_id


def get_mentors_by_certificates(db: Session, certificate_id: int):
    return (
        db.query(mentors_certificates)
        .filter(mentors_certificates.c.certificate_id == certificate_id)
        .all()
    )


def get_certificates_by_mentors(db: Session, mentors_id: int):
    return (
        db.query(mentors_certificates)
        .filter(mentors_certificates.c.mentor_id == mentors_id)
        .all()
    )


def add_mentor_certificate(db: Session, mentor_id: int, certificate_id: int):
    my_mentor = get_mentor_by_id(db, mentor_id)
    my_mentor.certificates.append(get_certificates_by_id(db, certificate_id))
    db.commit()
    return my_mentor


def delete_mentor_certificate(db: Session, mentor_id: int, certificate_id: int):
    my_mentor = get_mentor_by_id(db, mentor_id)
    my_mentor.certificates.remove(get_certificates_by_id(db, certificate_id))
    db.commit()
    return my_mentor
