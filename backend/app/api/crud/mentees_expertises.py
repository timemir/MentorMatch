from sqlalchemy.orm import Session
from app.models.menteesExpertises import mentees_expertises
from typing import List

def add_mentee_expertises(db: Session, mentee_id: int, expertise_ids: List[int]):
    # Create new entries for the mentees_expertises table
    new_mentee_expertises = [
        mentees_expertises.insert().values(mentee_id=mentee_id, expertise_id=expertise_id)
        for expertise_id in expertise_ids
    ]

    # Execute the insertions and commit the transaction
    for new_mentee_expertise in new_mentee_expertises:
        db.execute(new_mentee_expertise)
    db.commit()