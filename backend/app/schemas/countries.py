from pydantic import BaseModel
from .timestamps import Timestamps
from typing import Optional


class CountryBase(BaseModel):
    id: int
    name: str
    code: str


class CountryCreate(CountryBase):
    pass


class Country(CountryBase):
    timestamps: Optional[Timestamps]

    class Config:
        orm_mode = True
