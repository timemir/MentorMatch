from typing import List
from fastapi import APIRouter, Body, Depends, HTTPException, Response
from app.db.session import Session, get_db
from app.schemas.mentors import Mentor
from fastapi_jwt_auth import AuthJWT
from app.api.crud import users as crud_users
from app.api.crud import mentees as crud_mentees
from app.api.crud import matches as crud_matches
from app.api.crud import mentors as crud_mentors
from app.matching.match import match
from app.matching.weights import weights

router = APIRouter()


@router.post("/matches/request")
def place_match(
    mentor_id: int = Body(..., embed=True),
    db: Session = Depends(get_db),
    Authorize: AuthJWT = Depends(),
):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    user = crud_users.get_user_by_email(db, current_user)
    mentee = crud_mentees.get_mentee_by_user_id(db, user.id)
    db_match = crud_matches.place_match(db, mentor_id=mentor_id, mentee_id=mentee.id)
    return db_match


@router.get("/matches/find")
def find_matches(
    db: Session = Depends(get_db),
    Authorize: AuthJWT = Depends()
):
    Authorize.jwt_required()
    
    current_user_email = Authorize.get_jwt_subject()
    if current_user_email is None:
        raise HTTPException(status_code=404, detail="Auth Error")

    # Get the user data
    user = crud_users.get_user_by_email(db, current_user_email)
    
    # Convert the user object to a dictionary
    user_dict = {c.name: getattr(user, c.name) for c in user.__table__.columns}
    
    # Get mentee data of user
    mentee = crud_mentees.get_mentee_by_user_id(db, user.id)
    
    # Check if mentee is None, if so, raise an exception
    if mentee is None:
        raise HTTPException(status_code=404, detail="Mentee not found")

     # Convert the mentee object to a dictionary
    mentee_dict = {c.name: getattr(mentee, c.name) for c in mentee.__table__.columns}
    
    # Get mentee expertises
    mentee_expertises = crud_mentees.read_expertises_mentee(db, mentee_dict["id"])

    # Create a new dictionary that includes the user object (needed for matching algorithm)
    mentee_with_user = {**mentee_dict, "expertises": mentee_expertises, "user": user_dict}
    
    # Get mentors data
    mentors = crud_mentors.get_mentors_for_matching(db)
   
    matches = []
    # Loop over mentors and match them with the mentee
    for mentor in mentors:
        # Add expertises to each mentor
        mentor_expertises = crud_mentors.read_expertises_mentor(db, mentor["id"])
        mentor_with_expertises = {**mentor, "expertises": mentor_expertises}
        
        # calculate match score
        match_score = match(mentee_with_user, mentor_with_expertises, weights)
        
        # # create match object
        matches.append({"mentor": mentor, "score": match_score})
        
    # Sort matches by match score (in descending order)
    sorted_matches = sorted(matches, key=lambda match: match["score"], reverse=True)
    return sorted_matches
        
    



@router.get("/matches")
def read_matches(db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user_email = Authorize.get_jwt_subject()
    if current_user_email is None:
        raise HTTPException(status_code=404, detail="Auth Error")

    user = crud_users.get_user_by_email(db, current_user_email)
    db_match = crud_matches.get_matches(db, user_id=user.id, skip=0, limit=100)
    if db_match is None:
        raise HTTPException(status_code=404, detail="No matches found")
    return db_match


@router.get("/matches/{match_id}")
def read_match_by_id(match_id: int, db: Session = Depends(get_db)):
    db_match = crud_matches.get_match_by_id(db, match_id)
    return db_match


@router.patch("/matches/{match_id}/accept")
def update_match_status(match_id: int, db: Session = Depends(get_db)):
    db_match = crud_matches.update_match_status(db, match_id, "active")
    return db_match


# WIP.. aus irgend einem Grund klappt das mit active abr nicht mit rejected
@router.patch("/matches/{match_id}/reject")
def update_match_status(match_id: int, db: Session = Depends(get_db)):
    db_match = crud_matches.update_match_status(db, match_id, "rejected")
    return db_match
