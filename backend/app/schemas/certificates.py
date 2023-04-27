from typing import List, Optional
from pydantic import BaseModel
from .timestamps import Timestamps


class CertificateBase(BaseModel):
    name: str


class CertificateCreate(CertificateBase):
    pass


class Certificate(CertificateBase):
    id: int
    timestamps: Optional[Timestamps]

    class Config:
        orm_mode = True
