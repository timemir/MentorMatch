from sqlalchemy.orm import Session
from app.models.mentorsExpertises import mentors_expertises
from typing import List

def add_mentor_expertises(db: Session, mentor_id: int, expertise_ids: List[int]):
    # Create new entries for the mentors_expertises table
    new_mentor_expertises = [
        mentors_expertises.insert().values(mentor_id=mentor_id, expertise_id=expertise_id)
        for expertise_id in expertise_ids
    ]

    # Execute the insertions and commit the transaction
    for new_mentor_expertise in new_mentor_expertises:
        db.execute(new_mentor_expertise)
    db.commit()