from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.db.session import Session, get_db
from app.schemas.countries import Country
from app.api.crud import countries as crud_country

router = APIRouter()


@router.get("/countries")
def read_country(db: Session = Depends(get_db)):
    db_country = crud_country.get_countries(db, skip=0, limit=100)
    if not db_country:
        raise HTTPException(status_code=404, detail="Countries not found")
    return db_country


@router.get("/countries/{country_id}", response_model=Country)
def read_country_by_id(country_id: int, db: Session = Depends(get_db)):
    db_country = crud_country.get_country_by_id(db, country_id=country_id)
    if not db_country:
        raise HTTPException(status_code=404, detail="Country not found")
    return db_country


@router.get("/countries/name/{country_name}", response_model=Country)
def read_country_by_name(country_name: str, db: Session = Depends(get_db)):
    db_country = crud_country.get_country_by_name(db, country_name)
    if not db_country:
        raise HTTPException(status_code=404, detail="Country not found")
    return db_country
