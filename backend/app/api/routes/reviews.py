from typing import List, Optional
from fastapi import APIRouter, Body, Depends
from app.db.session import Session, get_db

import app.api.crud.reviews as crud_reviews


router = APIRouter()


@router.post("/reviews/create")
def create_rating(
    match_id: int = Body(..., embed=True),
    reviewer_id: int = Body(..., embed=True),  # user_id
    reviewee_id: int = Body(..., embed=True),  # user_id
    rating: int = Body(..., embed=True),
    db: Session = Depends(get_db),
):
    return crud_reviews.create_review(db, match_id, reviewer_id, reviewee_id, rating)


@router.get("/reviews")
def get_reviews(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
):
    return crud_reviews.get_reviews(db, skip=skip, limit=limit)


@router.get("/reviews/{review_id}")
def get_review(
    review_id: int,
    db: Session = Depends(get_db),
):
    return crud_reviews.get_review(db, review_id=review_id)


@router.get("/reviews/reviewer/{reviewer_id}")
def get_reviews_by_reviewer_id(
    reviewer_id: int,
    db: Session = Depends(get_db),
):
    return crud_reviews.get_reviews_by_reviewer_id(db, reviewer_id=reviewer_id)


@router.get("/reviews/reviewee/{reviewee_id}")
def get_reviews_by_reviewee_id(
    reviewee_id: int,
    db: Session = Depends(get_db),
):
    return crud_reviews.get_reviews_by_reviewee_id(db, reviewee_id=reviewee_id)
