/* eslint-disable indent */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-array-index-key */
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import api from "../../api/api";
import RatingModal from "../../components/UI/RatingModal/RatingModal";
import useAuthStore from "../../store/authStore";
import { Review } from "../../types/reviews";

const tabs = ["Active", "Pending", "Past", "Rejected"];

export default function Matches() {
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);
  const auth = useAuthStore();
  // get matches of currently logged in user
  const matches = useQuery({
    queryKey: ["matches"],
    queryFn: api.matches.getMatches,
  });

  // Get all reviews of currently logged in user
  const reviews = useQuery({
    queryKey: ["reviews"],
    queryFn: () => api.reviews.getReviewsByReviewer(auth.user.id),
  });

  // Object with boolean values to check if the user has matches
  const hasMatches = {
    active:
      (matches.data?.matches_as_mentee &&
        matches.data?.matches_as_mentee?.some(
          (match) => match.status === "active"
        )) ||
      (matches.data?.matches_as_mentor &&
        matches.data?.matches_as_mentor?.some(
          (match) => match.status === "active"
        )) ||
      false,
    pending:
      (matches.data?.matches_as_mentee &&
        matches.data?.matches_as_mentee?.some(
          (match) => match.status === "pending"
        )) ||
      (matches.data?.matches_as_mentor &&
        matches.data?.matches_as_mentor?.some(
          (match) => match.status === "pending"
        )) ||
      false,
    ended:
      (matches.data?.matches_as_mentee &&
        matches.data?.matches_as_mentee?.some(
          (match) => match.status === "ended"
        )) ||
      (matches.data?.matches_as_mentor &&
        matches.data?.matches_as_mentor?.some(
          (match) => match.status === "ended"
        )) ||
      false,
    rejected:
      (matches.data?.matches_as_mentee &&
        matches.data?.matches_as_mentee?.some(
          (match) => match.status === "rejected"
        )) ||
      (matches.data?.matches_as_mentor &&
        matches.data?.matches_as_mentor?.some(
          (match) => match.status === "rejected"
        )) ||
      false,
  };

  // Function to handle active tab
  function handleActiveTab(index: number) {
    setActiveTab(index);
  }

  // Function to handle accept match
  function handleAcceptMatch(matchId: number) {
    api.matches.patchMatchAccept(matchId);
    matches.refetch();
  }

  // Function to handle reject match
  function handleRejectMatch(matchId: number) {
    api.matches.patchMatchAccept(matchId);
    matches.refetch();
  }

  useEffect(() => {
    console.log(matches.data);
  }, [matches.data]);

  useEffect(() => {
    console.log(reviews.data);
  }, [reviews.data]);

  function checkReviewStatus(reviewsArr: Review[], revieweeId: number) {
    const status = reviewsArr?.some(
      (review: Review) => review.reviewee_id === revieweeId
    );

    return !status;
  }

  return (
    <div className="w-screen md:p-16">
      <h1 className="mb-4 font-oswald text-5xl">Matches</h1>
      <p className="mb-10">
        Here you can find everything related to your matches.
      </p>
      <div className="flex flex-col gap-2 ">
        <div
          aria-label="Tabs"
          role="tablist"
          className="-mb-px flex flex-wrap border-b border-gray-200 text-center text-mentorCTA dark:border-gray-700 dark:text-mentorCTA"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              type="button"
              className={`base flex items-center justify-center rounded-t-lg border-b-2 border-mentorCTA p-4 text-sm font-medium text-mentorCTA first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400  disabled:dark:text-gray-500 ${
                activeTab === index
                  ? "active font-semibold"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => handleActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div>
          {/* Active */}
          <div
            className={`p-4 ${activeTab === 0 ? "" : "hidden"}`}
            role="tabpanel"
          >
            {matches.isLoading && <p>Loading...</p>}
            {matches.isError && <p>Error</p>}
            {!hasMatches.active && (
              <p className="text-center">No active matches yet</p>
            )}
            {matches &&
              matches.data &&
              [
                ...matches.data?.matches_as_mentor,
                ...matches.data?.matches_as_mentee,
              ]
                ?.filter((match) => match.status === "active")
                .map((match) => (
                  <div
                    className="group flex items-center border-b-2 p-1 pb-4"
                    key={`${match.id}-${match.created_at}-a`}
                  >
                    <Link
                      className="min-w-max"
                      to={`/profile/${
                        match.mentee?.user?.id || match.mentor?.user?.id
                      }`}
                    >
                      <Avatar
                        className="group-hover:-translate-y-2 group-hover:transition "
                        size="lg"
                        img={
                          match.mentee?.user?.profile_picture ||
                          match.mentor?.user?.profile_picture
                        }
                      />
                    </Link>
                    <div className="ml-3 w-full">
                      <h3 className="group-hover:text-mentorCTA group-hover:transition">{`${
                        match.mentee?.user?.first_name ||
                        match.mentor?.user?.first_name
                      } ${
                        match.mentee?.user?.last_name ||
                        match.mentor?.user?.last_name
                      }`}</h3>
                      <span className="flex items-center ">
                        {[1, 2, 3, 4, 5].map((star) =>
                          (match.mentee?.user?.rating ||
                            match.mentor?.user?.rating) >= star ? (
                            <AiFillStar
                              key={`${star}-${
                                match.mentee?.id || match.mentor?.id
                              }-f`}
                              className="text-yellow-400"
                            />
                          ) : (
                            <AiOutlineStar
                              key={`${star}-${
                                match.mentee?.id || match.mentor?.id
                              }-o`}
                              className="text-yellow-400"
                            />
                          )
                        )}{" "}
                        <span className="ml-1 text-sm font-light">
                          {match.mentee?.user?.rating?.toFixed(1) ||
                            match.mentor?.user?.rating?.toFixed(1) ||
                            "0 ratings"}
                        </span>
                        {checkReviewStatus(
                          reviews.data,
                          match.mentee?.user?.id || match.mentor?.user?.id
                        ) && (
                          <>
                            {" "}
                            <RatingModal
                              match={match}
                              refetch={() => {
                                reviews?.refetch();
                                matches?.refetch();
                              }}
                            />
                          </>
                        )}
                      </span>
                    </div>
                    <span className="rounded-lg border-2 border-mentorCTA bg-mentorCTA p-1 text-white">
                      {match.mentee ? "Mentee" : "Mentor"}
                    </span>
                  </div>
                ))}
          </div>
          {/* Pending */}
          <div
            className={`p-4 ${
              activeTab === 1 ? "" : "hidden"
            } flex flex-col space-y-4`}
          >
            {matches.isLoading && <p>Loading...</p>}
            {matches.isError && <p>Error</p>}
            {!hasMatches.pending && (
              <p className="text-center">No pending matches at the moment</p>
            )}
            {matches &&
              matches.data &&
              matches.data?.matches_as_mentor
                ?.filter((match) => match.status === "pending")
                .map((match) => (
                  <div
                    className="group flex items-center border-b-2 p-1 pb-4"
                    key={`${match.id}-${match.created_at}-p`}
                  >
                    <Link
                      className="min-w-max"
                      to={`/profile/${match.mentee?.user?.id}`}
                    >
                      <Avatar
                        className="group-hover:-translate-y-2 group-hover:transition "
                        size="lg"
                        img={match.mentee?.user?.profile_picture}
                      />
                    </Link>
                    <div className="ml-3 w-full">
                      <h3 className="group-hover:text-mentorCTA group-hover:transition">{`${match.mentee?.user?.first_name} ${match.mentee?.user?.last_name}`}</h3>
                      <span className="flex items-center ">
                        {[1, 2, 3, 4, 5].map((star) =>
                          match.mentee?.user?.rating >= star ? (
                            <AiFillStar
                              key={`${star}-${match.mentee?.id}-f`}
                              className="text-yellow-400"
                            />
                          ) : (
                            <AiOutlineStar
                              key={`${star}-${match.mentee?.id}-o`}
                              className="text-yellow-400"
                            />
                          )
                        )}
                        <span className="ml-1 text-sm font-light">
                          {match.mentee?.user?.rating?.toFixed(1) ||
                            "0 ratings"}
                        </span>
                      </span>

                      <div className="mt-4  flex space-x-4">
                        <button
                          type="button"
                          className="rounded-lg bg-green-200 p-2 text-green-900 hover:bg-green-700 hover:text-white hover:transition"
                          onClick={() => handleAcceptMatch(match.id)}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          className="rounded-lg bg-red-200 p-2 text-red-900 hover:bg-red-700 hover:text-white hover:transition"
                          onClick={() => {
                            handleRejectMatch(match.id);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {/* Past */}
          <div className={`p-4 ${activeTab === 2 ? "" : "hidden"}`}>
            {matches.isLoading && <p>Loading...</p>}
            {matches.isError && <p>Error</p>}
            {!hasMatches.ended && (
              <p className="text-center">No past matches yet</p>
            )}
            {matches &&
              matches.data &&
              [
                ...matches.data?.matches_as_mentor,
                ...matches.data?.matches_as_mentee,
              ]
                ?.filter((match) => match.status === "ended")
                .map((match) => (
                  <div
                    className="group flex items-center border-b-2 p-1 pb-4"
                    key={match.id}
                  >
                    <Link
                      className="min-w-max"
                      to={`/profile/${
                        match.mentee?.user?.id || match.mentor?.user?.id
                      }`}
                    >
                      <Avatar
                        className="group-hover:-translate-y-2 group-hover:transition "
                        size="lg"
                        img={
                          match.mentee?.user?.profile_picture ||
                          match.mentor?.user?.profile_picture
                        }
                      />
                    </Link>
                    <div className="ml-3 w-full">
                      <h3 className="group-hover:text-mentorCTA group-hover:transition">{`${
                        match.mentee?.user?.first_name ||
                        match.mentor?.user?.first_name
                      } ${
                        match.mentee?.user?.last_name ||
                        match.mentor?.user?.last_name
                      }`}</h3>
                      <span className="flex items-center ">
                        {[1, 2, 3, 4, 5].map((star) =>
                          (match.mentee?.user?.rating ||
                            match.mentor?.user?.rating) >= star ? (
                            <AiFillStar
                              key={`${star}-${
                                match.mentee?.id || match.mentor?.id
                              }-f`}
                              className="text-yellow-400"
                            />
                          ) : (
                            <AiOutlineStar
                              key={`${star}-${
                                match.mentee?.id || match.mentor?.id
                              }-o`}
                              className="text-yellow-400"
                            />
                          )
                        )}
                        <span className="ml-1 text-sm font-light">
                          {match.mentee?.user?.rating?.toFixed(1) ||
                            match.mentor?.user?.rating?.toFixed(1) ||
                            "0 ratings"}
                        </span>
                      </span>
                    </div>
                    <span className="rounded-lg border-2 border-mentorCTA bg-mentorCTA p-1 text-white">
                      {match.mentee ? "Mentee" : "Mentor"}
                    </span>
                  </div>
                ))}
          </div>
          {/* Rejected */}
          <div className={`p-4 ${activeTab === 3 ? "" : "hidden"}`}>
            {matches.isLoading && <p>Loading...</p>}
            {matches.isError && <p>Error</p>}
            {!hasMatches.rejected && (
              <p className="text-center">No rejected matches yet</p>
            )}
            {matches &&
              matches.data &&
              [
                ...matches.data?.matches_as_mentor,
                ...matches.data?.matches_as_mentee,
              ]
                ?.filter((match) => match.status === "rejected")
                .map((match) => (
                  <div
                    className="group flex items-center border-b-2 p-1 pb-4"
                    key={`${match.id}-${match.created_at}-e`}
                  >
                    <Link
                      className="min-w-max"
                      to={`/profile/${
                        match.mentee?.user?.id || match.mentor?.user?.id
                      }`}
                    >
                      <Avatar
                        className=" group-hover:-translate-y-2 group-hover:transition"
                        size="lg"
                        img={
                          match.mentee?.user?.profile_picture ||
                          match.mentor?.user?.profile_picture
                        }
                      />
                    </Link>
                    <div className="ml-3 w-full">
                      <h3 className="group-hover:text-mentorCTA group-hover:transition">{`${
                        match.mentee?.user?.first_name ||
                        match.mentor?.user?.first_name
                      } ${
                        match.mentee?.user?.last_name ||
                        match.mentor?.user?.last_name
                      }`}</h3>
                      <span className="flex items-center ">
                        {[1, 2, 3, 4, 5].map((star) =>
                          (match.mentee?.user?.rating ||
                            match.mentor?.user?.rating) >= star ? (
                            <AiFillStar
                              key={`${star}-${match.mentee?.id}-f`}
                              className="text-yellow-400"
                            />
                          ) : (
                            <AiOutlineStar
                              key={`${star}-${match.mentee?.id}-o`}
                              className="text-yellow-400"
                            />
                          )
                        )}
                        <span className="ml-1 text-sm font-light">
                          {match.mentee?.user?.rating?.toFixed(1) ||
                            match.mentor?.user?.rating?.toFixed(1) ||
                            "0 ratings"}
                        </span>
                      </span>
                    </div>
                    <span className="rounded-lg border-2 border-mentorCTA bg-mentorCTA p-1 text-white">
                      {match.mentee ? "Mentee" : "Mentor"}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
