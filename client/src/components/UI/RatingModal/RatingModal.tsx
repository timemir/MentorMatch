/* eslint-disable react/jsx-no-bind */
import { useMutation } from "@tanstack/react-query";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar, AiFillHeart } from "react-icons/ai";
import api from "../../../api/api";
import useAuthStore from "../../../store/authStore";
import { Review } from "../../../types/reviews";

interface RatingModalProps {
  match: any;
  refetch: () => void;
}

export default function RatingModal({ match, refetch }: RatingModalProps) {
  const [show, setShow] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const auth = useAuthStore();

  const reviewsMutation = useMutation({
    mutationFn: (review: Review) => api.reviews.createReview(review),
  });

  function handleAccept() {
    reviewsMutation.mutate({
      match_id: match.id,
      reviewer_id: auth.user?.id,
      reviewee_id: match.mentor ? match.mentor.user.id : match.mentee.user.id,
      rating: selectedStar,
    });
    refetch();
  }
  function handleDecline() {
    setShow(false);
  }
  function handleClose() {
    setShow(false);
  }
  function handleStarHover(star: number) {
    setHoveredStar(star);
  }
  function handleMouseLeave() {
    setHoveredStar(selectedStar);
  }
  function handleStarClick(star: number) {
    setSelectedStar(star);
  }

  return (
    <>
      <button
        type="button"
        className="ml-2 rounded-lg bg-mentorCTA px-1 text-sm text-white hover:bg-mentorCTA800"
        onClick={() => setShow(true)}
      >
        Rate now
      </button>
      <Modal
        position="bottom-center"
        dismissible
        show={show}
        onClose={handleClose}
        className="pt-24"
      >
        <Modal.Header>
          {!reviewsMutation.isSuccess
            ? `
          Rate 
          ${match?.mentee?.user?.first_name || match?.mentor?.user?.first_name} 
          ${match?.mentee?.user?.last_name || match?.mentor?.user?.last_name}`
            : "Thank you!"}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 text-center">
            {!reviewsMutation.isSuccess ? (
              <>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  How would you rate your experience with{" "}
                  {match?.mentee?.user?.first_name ||
                    match?.mentor?.user?.first_name}{" "}
                  {match?.mentee?.user?.last_name ||
                    match?.mentor?.user?.last_name}{" "}
                  ?
                </p>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="inline-block text-2xl text-gray-400"
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleStarClick(star)}
                    >
                      {star <= (hoveredStar || selectedStar) ? (
                        <AiFillStar className="text-yellow-400" />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Thank you for your feedback!
                </p>
                <AiFillHeart className="mx-auto text-5xl text-red-500" />
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-center">
          {!reviewsMutation.isSuccess && !reviewsMutation.isLoading && (
            <button
              type="button"
              className="rounded-lg bg-mentorCTA px-4 py-2 text-white hover:bg-mentorCTA500 disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={selectedStar === 0}
              onClick={handleAccept}
            >
              {reviewsMutation.isError ? "Try again" : "Submit"}
            </button>
          )}

          {reviewsMutation.isLoading && (
            <button
              type="button"
              className="rounded-lg bg-mentorCTA px-4 py-2 text-white hover:bg-mentorCTA500 disabled:cursor-not-allowed disabled:bg-gray-400"
              onClick={handleAccept}
            >
              Loading...
            </button>
          )}
          {reviewsMutation.isSuccess && (
            <button
              type="button"
              className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-300"
              onClick={() => {
                setShow(false);
                refetch();
              }}
            >
              Done
            </button>
          )}
          <button
            type="button"
            className="box-content  rounded-lg border-2 border-transparent px-4 py-2 text-gray-500 hover:border-gray-200"
            onClick={handleDecline}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
