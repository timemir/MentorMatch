from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.db.session import Session, get_db
from app.schemas.users import User, UserCreate, UserUpdate, UserOnboard
from fastapi_jwt_auth import AuthJWT
from app.api.crud import users as crud_user

router = APIRouter()


@router.get("/user")
def read_current_user(db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()  # returns user email
    return crud_user.get_user_by_email(db, current_user)


@router.get("/users")
def read_users(db: Session = Depends(get_db)):
    db_users = crud_user.get_users(db, skip=0, limit=100)
    if db_users is None:
        raise HTTPException(status_code=404, detail="Users not found")
    return db_users


@router.get("/users/{user_id}", response_model=User)
def read_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/users", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_user.create_user(db=db, user=user)


@router.patch("/users/{user_id}")
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User not found")
    return crud_user.update_user(db, user_id, user)


@router.patch("/users/{user_id}/onboard")
def onboard_user(user_id: int, user: UserOnboard, db: Session = Depends(get_db)):
    return crud_user.onboard_user(db, user_id, user)
