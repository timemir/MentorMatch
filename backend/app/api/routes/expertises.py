from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.db.session import Session, get_db
from app.schemas.expertises import Expertise
from app.api.crud import expertises as crud_expertise

router = APIRouter()


@router.get("/expertises")
def read_expertise(db: Session = Depends(get_db), skip: int = 0, limit: int = None):
    db_expertise = crud_expertise.get_expertises(db, skip=skip, limit=limit)
    if not db_expertise:
        raise HTTPException(status_code=404, detail="Expertise not found")
    return db_expertise


@router.get("/expertises/{expertise_id}", response_model=Expertise)
def read_expertises_by_id(expertise_id: int, db: Session = Depends(get_db)):
    db_expertise = crud_expertise.get_expertises_by_id(db, expertise_id=expertise_id)
    if not db_expertise:
        raise HTTPException(status_code=404, detail="Expertise not found")
    return db_expertise
