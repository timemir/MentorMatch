from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.db.session import Session, get_db
from app.schemas.certificates import Certificate
from app.api.crud import certificates as crud_certificate

router = APIRouter()


@router.get("/certificates")
def read_certificates(db: Session = Depends(get_db)):
    db_certificates = crud_certificate.get_certificates(db, skip=0, limit=100)
    if not db_certificates:
        raise HTTPException(status_code=404, detail="Certificates not found")
    return db_certificates


@router.get("/certificates/{certificate_id}", response_model=Certificate)
def read_certificates_by_id(certificate_id: int, db: Session = Depends(get_db)):
    db_certificates = crud_certificate.get_certificates_by_id(
        db, certificate_id=certificate_id
    )
    if not db_certificates:
        raise HTTPException(status_code=404, detail="Certificate not found")
    return db_certificates
