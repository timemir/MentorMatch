from typing import Optional
from pydantic import BaseModel
from .timestamps import Timestamps


class UserBase(BaseModel):
    email: str
    first_name: str
    last_name: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserCreate(UserBase):
    password: str


class UserOnboard(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    profile_picture: Optional[str]
    bio: Optional[str]
    job_title: Optional[str]
    company: Optional[str]
    country_code: Optional[str]
    is_mentor: bool = False

    class Config:
        orm_mode = True


class User(UserBase):
    id: int
    email_verified: bool = False
    salt: Optional[str]
    hashed_password: str
    profile_picture: Optional[str]
    bio: Optional[str]
    gender: Optional[str]
    age: Optional[int]
    job_title: Optional[str]
    company: Optional[str]
    country_code: Optional[str]
    is_active: bool = True
    is_mentor: bool = False
    is_superuser: bool = False
    rating: float = 0.0
    timestamps: Optional[Timestamps]

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    is_mentor: Optional[bool] = False
    email: Optional[str] = None
    last_name: Optional[str] = None

    class Congif:
        orm_mode = True


class UserRead(UserBase):
    id: int
