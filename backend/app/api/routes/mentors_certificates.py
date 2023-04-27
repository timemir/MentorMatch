from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.db.session import Session, get_db
import app.api.crud.mentors_certificates as crud_mentors_certificates

# from app.schemas.mentorscertificates import mentorcertificate        Import Error in mentorscertificates cannot import name "ForeignKey" from pydantic

router = APIRouter()


@router.get(
    "/get_mentors_by_certificates/{certificate_id}"
)  # , response_model=mentorcertificate
def get_mentors_by_certificates(certificate_id: int, db: Session = Depends(get_db)):
    db_mentors = crud_mentors_certificates.get_mentors_by_certificates(
        db, certificate_id
    )
    if not db_mentors:
        raise HTTPException(status_code=404, detail="mentor not found")
    return db_mentors


@router.get("/get_certificate_by_mentors/{mentors_id}")
def get_certificates_by_mentors(mentors_id: int, db: Session = Depends(get_db)):
    db_mentors = crud_mentors_certificates.get_certificates_by_mentors(db, mentors_id)
    if not db_mentors:
        raise HTTPException(status_code=404, detail="mentor not found")
    return db_mentors


@router.get("/add_mentor_certificate/{mentors_id}_{certificate_id}")
def add_mentor_certificate(
    mentors_id: int, certificate_id: int, db: Session = Depends(get_db)
):
    db_mentors = crud_mentors_certificates.add_mentor_certificate(
        db, mentors_id, certificate_id
    )
    if not db_mentors:
        raise HTTPException(status_code=404, detail="mentor not found")
    return db_mentors


@router.get("/delete_mentor_certificate/{mentors_id}_{certificate_id}")
def delete_mentor_certificate(
    mentors_id: int, certificate_id: int, db: Session = Depends(get_db)
):
    db_mentors = crud_mentors_certificates.delete_mentor_certificate(
        db, mentors_id, certificate_id
    )
    if not db_mentors:
        raise HTTPException(status_code=404, detail="mentor not found")
    return db_mentors
