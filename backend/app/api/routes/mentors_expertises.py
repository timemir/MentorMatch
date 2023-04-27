from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.db.session import Session, get_db
import app.api.crud.mentors_expertises as crud_mentors_expertises

router = APIRouter()


@router.get(
    "/get_mentors_by_expertises/{expertise_id}"
)  
def get_mentors_by_expertises(expertise_id: int, db: Session = Depends(get_db)):
    db_mentors = crud_mentors_expertises.get_mentors_by_expertises(db, expertise_id)
    if not db_mentors:
        raise HTTPException(status_code=404, detail="mentor not found")
    return db_mentors


@router.get("/get_expertise_by_mentors/{mentors_id}")
def get_expertises_by_mentors(mentors_id: int, db: Session = Depends(get_db)):
    db_mentors = crud_mentors_expertises.get_expertises_by_mentors(db, mentors_id)
    if not db_mentors:
        raise HTTPException(status_code=404, detail="mentor not found")
    return db_mentors


@router.get("/add_mentor_expertise/{mentors_id}_{expertise_id}")
def add_mentor_expertise(
    mentors_id: int, expertise_id: int, db: Session = Depends(get_db)
):
    db_mentors = crud_mentors_expertises.add_mentor_expertise(
        db, mentors_id, expertise_id
    )
    if not db_mentors:
        raise HTTPException(status_code=404, detail="mentor not found")
    return db_mentors


@router.get("/delete_mentor_expertise/{mentors_id}_{expertise_id}")
def delete_mentor_expertise(
    mentors_id: int, expertise_id: int, db: Session = Depends(get_db)
):
    db_mentors = crud_mentors_expertises.delete_mentor_expertise(
        db, mentors_id, expertise_id
    )
    if not db_mentors:
        raise HTTPException(status_code=404, detail="mentor not found")
    return db_mentors
