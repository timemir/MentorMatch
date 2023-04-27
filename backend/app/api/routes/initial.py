from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.db.session import Session, get_db
from app.api.crud import countries as crud_country
from app.api.crud import certificates as crud_certificate
from app.api.crud import expertises as crud_expertise
from app.api.crud import users as crud_users
from app.api.crud import initial as crud_initial

router = APIRouter()


@router.post("/load_initial_data")
async def load_initial_data_endpoint(db: Session = Depends(get_db)):
    try:
        crud_initial.load_initial_data(db)
        return {"message": "Initial data loaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/delete")
def delete_initial_db(db: Session = Depends(get_db)):
    crud_certificate.delete_certificates(db=db)
    crud_country.delete_countries(db=db)
    crud_expertise.delete_expertises(db=db)
    crud_users.delete_users(db=db)
