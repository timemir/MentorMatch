from sqlalchemy.orm import Session
from app.models.countries import Country
import pycountry


def get_country_by_id(db: Session, country_id: int):
    return (
        db.query(Country.id, Country.name, Country.code)
        .filter(Country.id == country_id)
        .first()
    )


def get_countries(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Country.id, Country.name, Country.code)
        .order_by(Country.name)
        .offset(skip)
        .limit(limit)
        .all()
    )
    
def get_country_by_name(db: Session, country_name: str):
    return (
        db.query(Country.id, Country.name, Country.code)
        .filter(Country.name == country_name)
        .first()
    )


def create_countries(db: Session):
    countries = pycountry.countries

    for country in countries:
        db_country = Country(
            name=country.name, code=country.alpha_2
        )  
        db.add(db_country)

    db.commit()
    db.refresh(db_country)
    return db_country


def delete_countries(db: Session):
    db.query(Country).delete()
    db.commit()
