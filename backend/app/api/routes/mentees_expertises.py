from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.db.session import Session, get_db
import app.api.crud.mentees_expertises as crud_mentees_expertises

# from app.schemas.menteesExpertises import MenteeExpertise        Import Error in menteesExpertises cannot import name "ForeignKey" from pydantic

router = APIRouter()


@router.get(
    "/get_mentees_by_expertises/{expertise_id}"
)  # , response_model=MenteeExpertise
def get_mentees_by_expertises(expertise_id: int, db: Session = Depends(get_db)):
    db_mentees = crud_mentees_expertises.get_mentees_by_expertises(db, expertise_id)
    if not db_mentees:
        raise HTTPException(status_code=404, detail="Mentee not found")
    return db_mentees


@router.get("/get_expertise_by_mentees/{mentees_id}")
def get_expertises_by_mentees(mentees_id: int, db: Session = Depends(get_db)):
    db_mentees = crud_mentees_expertises.get_expertises_by_mentees(db, mentees_id)
    if not db_mentees:
        raise HTTPException(status_code=404, detail="Mentee not found")
    return db_mentees


@router.get("/add_mentee_expertise/{mentees_id}_{expertise_id}")
def add_mentee_expertise(
    mentees_id: int, expertise_id: int, db: Session = Depends(get_db)
):
    db_mentees = crud_mentees_expertises.add_mentee_expertise(
        db, mentees_id, expertise_id
    )
    if not db_mentees:
        raise HTTPException(status_code=404, detail="Mentee not found")
    return db_mentees


@router.get("/delete_mentee_expertise/{mentees_id}_{expertise_id}")
def delete_mentee_expertise(
    mentees_id: int, expertise_id: int, db: Session = Depends(get_db)
):
    db_mentees = crud_mentees_expertises.delete_mentee_expertise(
        db, mentees_id, expertise_id
    )
    if not db_mentees:
        raise HTTPException(status_code=404, detail="Mentee not found")
    return db_mentees
