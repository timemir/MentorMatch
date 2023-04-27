from sqlalchemy.orm import Session
from app.models.users import User
from app.schemas.users import UserCreate
from fastapi_jwt_auth import AuthJWT
import bcrypt
from fastapi import Response
from starlette.config import Config

config = Config(".env")

max_age: int = config("ACCESS_TOKEN_EXPIRE", cast=int)  # Maybe change?


def login(db: Session, user: User, Authorize: AuthJWT, response: Response):
    access_token = Authorize.create_access_token(subject=user.email)
    Authorize.set_access_cookies(access_token, response, max_age)

    # TODO: Change later to return something else, like "Logged in succesfully"
    return {"email": user.email}


def register(db: Session, user: UserCreate):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(user.password.encode("utf-8"), salt)

    # Convert the bytes object to a hexadecimal string, so it can be stored in the database
    hashed_password_hex = hashed_password.hex()

    db_user = User(
        email=user.email,
        salt=salt,
        hashed_password=hashed_password_hex,
        first_name=user.first_name,
        last_name=user.last_name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
