from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.reviews import Review
from app.models.users import User


def update_user_rating(db: Session, reviewee_id: int):
    user = db.query(User).filter(User.id == reviewee_id).one()
    if not user:
        return None

    # Fetch all reviews where the user ID matches the reviewee ID
    reviews = db.query(Review).filter(Review.reviewee_id == reviewee_id).all()

    # Calculate the sum and count of the ratings
    ratings_sum = sum([review.rating for review in reviews])
    ratings_count = len(reviews)

    # Update the user's rating
    user.rating = ratings_sum / ratings_count

    db.commit()
    return user


def create_review(
    db: Session, match_id: int, reviewer_id: int, reviewee_id: int, rating: int
):
    db_review = Review(
        match_id=match_id,
        reviewer_id=reviewer_id,
        reviewee_id=reviewee_id,
        rating=rating,
    )

    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    updated_user = update_user_rating(db, reviewee_id)
    if updated_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return db_review


def get_reviews(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Review).offset(skip).limit(limit).all()


def get_review(db: Session, review_id: int):
    return db.query(Review).filter(Review.id == review_id).first()


def get_reviews_by_reviewer_id(db: Session, reviewer_id: int):
    return db.query(Review).filter(Review.reviewer_id == reviewer_id).all()


def get_reviews_by_reviewee_id(db: Session, reviewee_id: int):
    return db.query(Review).filter(Review.reviewee_id == reviewee_id).all()
