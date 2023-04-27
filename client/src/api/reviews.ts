import { Review } from "../types/reviews";
import BASE_URL from "./config";

async function createReview(review: Review): Promise<Review> {
  const response = await fetch(
    `${BASE_URL}/reviews/create`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        match_id: review.match_id,
        reviewer_id: review.reviewer_id,
        reviewee_id: review.reviewee_id,
        rating: review.rating,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function getReviewsByReviewer(reviewer_id: number): Promise<Review[]> {
  const response = await fetch(
    `${BASE_URL}/reviews/reviewer/${reviewer_id}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function getReviewsByReviewee(reviewee_id: number): Promise<Review[]> {
  const response = await fetch(
    `${BASE_URL}/reviews/reviewee/${reviewee_id}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

const reviews = {
  createReview,
  getReviewsByReviewer,
  getReviewsByReviewee,
};

export default reviews;
