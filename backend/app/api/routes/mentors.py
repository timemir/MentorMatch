# """
# This file defines the endpoints for the mentor resource in the FastAPI application.
# The MentorRepository class is used to interact with the mentor data stored in our database.
# The Depends argument is used to declare the MentorRepository instance as a dependency,
# which is passed to the endpoint functions as the mentor_repo parameter.
# """
from typing import List, Optional
from fastapi import APIRouter, Body, Depends, HTTPException, Query
from app.schemas.searchquery import SearchQuery
from app.schemas.mentors import Mentor, MentorBase
from app.db.session import Session, get_db
from app.models.expertises import Expertise
from app.models.mentors import Mentor as MentorModel
import app.api.crud.mentors as crud_mentors
import app.api.crud.mentors_expertises as crud_mentors_expertises


router = APIRouter()


@router.get("/mentors")
def read_mentors(db: Session = Depends(get_db)):
    db_mentors = crud_mentors.get_mentors(db, skip=0, limit=100)
    if db_mentors is None:
        raise HTTPException(status_code=404, detail="mentors not found")
    return db_mentors


@router.get("/mentors/{mentor_id}", response_model=Mentor)
def get_mentor_by_id(mentor_id: int, db: Session = Depends(get_db)):
    db_mentor = crud_mentors.get_mentor_by_id(db, mentor_id=mentor_id)
    if not db_mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")
    return db_mentor


@router.get("/mentors/users/{user_id}", response_model=Mentor)
def get_mentor_by_user_id(user_id: int, db: Session = Depends(get_db)):
    db_mentor = crud_mentors.get_mentor_by_user_id(db, user_id=user_id)

    if not db_mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")
    return db_mentor


@router.patch("/mentors/{mentor_id}/update/")
def update_mentor(mentor_id: int, mentor: MentorBase, db: Session = Depends(get_db)):
    db_mentor = crud_mentors.get_mentor_by_id(db, mentor_id=mentor_id)
    if db_mentor is None:
        raise HTTPException(status_code=400, detail="mentor not found")
    return crud_mentors.update_mentor(db, mentor_id, mentor)


@router.post("/mentors/create")
def create_mentor(user_id: int = Body(..., embed=True), db: Session = Depends(get_db)):
    return crud_mentors.create_mentor(db, user_id)


@router.get("/mentors_and_users")
def read_mentors_and_users(
    user_input: Optional[str] = Query(""),
    expertise_id: Optional[int] = Query(None),
    country_id: Optional[str] = Query(""),
    level_id: Optional[int] = Query(None),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    print(
        f"user_input: {user_input}",
        f"expertise_id: {expertise_id}",
        f"country_id: {country_id}",
        f"level_id: {level_id}",
    )
    search_query = SearchQuery(
        user_input=user_input,
        expertise_id=expertise_id,
        country_id=country_id,
        level_id=level_id,
    )

    if search_query is None:
        search_query = {}

    if isinstance(search_query, SearchQuery):
        search_query = search_query.dict()

    db_mentors_and_users = crud_mentors.get_mentors_and_users(
        db, search_query, skip, limit
    )
    if not db_mentors_and_users:
        raise HTTPException(status_code=404, detail="mentors not found")
    return db_mentors_and_users


@router.post("/mentors/{mentor_id}/expertises")
def link_mentor_expertises(mentor_id: int, expertise_ids: List[int] = Body(..., embed=True), db: Session = Depends(get_db)):
    # Check if the mentor exists
    mentor = db.query(MentorModel).filter(MentorModel.id == mentor_id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")

    # Check if all expertises exist
    expertises = db.query(Expertise).filter(Expertise.id.in_(expertise_ids)).all()
    if len(expertises) != len(expertise_ids):
        raise HTTPException(status_code=404, detail="One or more expertises not found")

    # Add the new associations to the mentors_expertises table
    crud_mentors_expertises.add_mentor_expertises(db, mentor_id, expertise_ids)

    return {"detail": "Mentor expertises added successfully"}

@router.get("/mentors/{mentor_id}/expertises")
def get_mentor_expertises(mentor_id: int, db: Session = Depends(get_db)):
    # Check if the mentor exists
    mentor = db.query(MentorModel).filter(MentorModel.id == mentor_id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")

    # Get the expertises associated with the mentor
    expertises = mentor.expertises

    # Return the expertises as a list of dictionaries
    return [{"id": expertise.id, "name": expertise.name} for expertise in expertises]