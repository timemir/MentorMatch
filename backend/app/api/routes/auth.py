from typing import List
from fastapi import APIRouter, Depends, HTTPException, Response
from app.db.session import Session, get_db
from app.schemas.users import User, UserLogin, UserCreate
from fastapi_jwt_auth import AuthJWT
import bcrypt

from app.api.crud import auth as crud_auth
from app.api.crud import users as crud_user


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login_user(
    user: UserLogin,
    response: Response,
    db: Session = Depends(get_db),
    Authorize: AuthJWT = Depends(),
):
    db_user = crud_user.get_user_by_email(db, email=user.email)
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")

    # Convert the hexadecimal string to a bytes object
    stored_password_hex = db_user.hashed_password
    stored_password = bytes.fromhex(stored_password_hex)

    # Check if the password is correct
    is_valid = bcrypt.checkpw(user.password.encode("utf-8"), stored_password)
    if not is_valid:
        raise HTTPException(status_code=401, detail="Password is incorrect")

    return crud_auth.login(db=db, user=user, Authorize=Authorize, response=response)


@router.post("/register", response_model=User)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_auth.register(db=db, user=user)


# TODO: Setup protected routes for testing
# https://indominusbyte.github.io/fastapi-jwt-auth/usage/basic/


@router.get("/protectedTestUser")
def test_protected(
    Authorize: AuthJWT = Depends(),
    db: Session = Depends(get_db),
):
    try:
        Authorize.jwt_required()
        current_user = Authorize.get_jwt_subject()
        if current_user:
            return {"current_user": current_user}
    except Exception as e:
        raise HTTPException(status_code=401, detail=e.message)


@router.post("/testPostAuth")
def test_post(
    Authorize: AuthJWT = Depends(),
    db: Session = Depends(get_db),
):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    if current_user:
        return {"current_user": current_user}
