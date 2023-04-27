from typing import List
from fastapi import APIRouter, Body, Depends, HTTPException
import app.api.crud.mentees as crud_mentees
import app.api.crud.mentees_expertises as crud_mentees_expertises

from app.schemas.mentees import Mentee, MenteeBase
from app.db.session import Session, get_db
from app.models.mentees import Mentee as MenteeModel
from app.models.expertises import Expertise

router = APIRouter()


@router.get("/mentees")
def read_mentees(db: Session = Depends(get_db)):
    db_mentees = crud_mentees.get_mentees(db, skip=0, limit=100)
    if db_mentees is None:
        raise HTTPException(status_code=404, detail="Mentee not found")
    return db_mentees


# TODO: Configure database
@router.get("/mentees/{mentee_id}", response_model=Mentee)
def get_mentees_by_id(mentee_id: int, db: Session = Depends(get_db)):
    db_mentee = crud_mentees.get_mentees_by_id(db, mentee_id=mentee_id)
    if db_mentee is None:
        raise HTTPException(status_code=404, detail="Mentee not found")
    return db_mentee


@router.patch("/mentees/update/{mentee_id}")
def update_mentee(mentee_id: int, mentee: MenteeBase, db: Session = Depends(get_db)):
    db_mentee = crud_mentees.get_mentees_by_id(db, mentee_id=mentee_id)
    if db_mentee is None:
        raise HTTPException(status_code=400, detail="Mentee not found")
    return crud_mentees.update_mentee(db, mentee_id, mentee)


@router.post("/mentees/create")
def create_mentee(user_id: int = Body(..., embed=True), db: Session = Depends(get_db)):
    return crud_mentees.create_mentee(db, user_id)


@router.get("/mentees/users/{user_id}", response_model=Mentee)
def get_mentee_by_user_id(user_id: int, db: Session = Depends(get_db)):
    db_mentee = crud_mentees.get_mentee_by_user_id(db, user_id=user_id)

    if not db_mentee:
        raise HTTPException(status_code=404, detail="Mentee not found")
    return db_mentee

@router.post("/mentees/{mentee_id}/expertises")
def link_mentee_expertises(mentee_id: int, expertise_ids: List[int] = Body(..., embed=True), db: Session = Depends(get_db)):
    # Check if the mentee exists
    mentee = db.query(MenteeModel).filter(MenteeModel.id == mentee_id).first()
    if not mentee:
        raise HTTPException(status_code=404, detail="Mentee not found")

    # Check if all expertises exist
    expertises = db.query(Expertise).filter(Expertise.id.in_(expertise_ids)).all()
    if len(expertises) != len(expertise_ids):
        raise HTTPException(status_code=404, detail="One or more expertises not found")

    # Add the new associations to the mentees_expertises table
    crud_mentees_expertises.add_mentee_expertises(db, mentee_id, expertise_ids)

    return {"detail": "Mentee expertises added successfully"}

@router.get("/mentees/{mentee_id}/expertises")
def get_mentee_expertises(mentee_id: int, db: Session = Depends(get_db)):
    # Check if the mentee exists
    mentee = db.query(MenteeModel).filter(MenteeModel.id == mentee_id).first()
    if not mentee:
        raise HTTPException(status_code=404, detail="Mentee not found")

    # Get the expertises associated with the mentee
    expertises = mentee.expertises

    # Return the expertises as a list of dictionaries
    return [{"id": expertise.id, "name": expertise.name} for expertise in expertises]