export type Review = {
  match_id: number;
  reviewer_id: number;
  reviewee_id: number;
  rating: number;
  review?: string | null;
};
