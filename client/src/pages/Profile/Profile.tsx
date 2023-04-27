import { Tab } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import emojiFlags from "emoji-flags";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import TabOverview from "../../components/Profile/TabOverview";
import useAuthStore from "../../store/authStore";

// Helper function to combine class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  // Get the user id from the url
  const { userId } = useParams();

  // Auth Store to check if the user is the same as the profile
  const auth = useAuthStore();

  // Get the matches data
  const matches = useQuery({
    queryKey: ["matches"],
    queryFn: api.matches.getMatches,
  });

  // Get the reviews data
  const reviews = useQuery({
    queryKey: ["reviews"],
    queryFn: () => api.reviews.getReviewsByReviewee(Number(userId)),
  });

  // State to check if the user has already sent a request
  const [hasSentRequest, setHasSentRequest] = useState(false);

  // Get the user data
  const user = useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.users.getUserById(Number(userId)),
  });

  // Get the mentor data
  const mentor = useQuery({
    queryKey: ["mentor", userId],
    queryFn: () => api.mentors.getMentorByUserId(Number(userId)),
    enabled: user.data?.is_mentor === true,
  });

  // Get the mentee data
  const mentee = useQuery({
    queryKey: ["mentee", userId],
    queryFn: () => api.mentees.getMenteeByUserId(Number(userId)),
    enabled: user.data?.is_mentor === false,
  });

  // Check if the user has already sent a request
  useEffect(() => {
    matches?.data?.matches_as_mentee.forEach((match) => {
      if (match.mentor.user.id === Number(userId)) {
        setHasSentRequest(true);
      }
    });
  }, [matches.data, userId]);

  // State is not optimal for this static data. TODO: Refactor
  const [categories] = useState(["Overview", "My Mentors", "Reviews"]);

  // Mutation Function to send a request to a mentor
  const sendRequestMutation = useMutation({
    mutationFn: () => api.matches.postMatchRequest(mentor.data.id),
  });

  // Function to handle the send request button
  function handleSendRequest() {
    sendRequestMutation.mutate();
    setHasSentRequest(true);
  }

  return (
    <div className="mb-96 min-h-screen">
      {/* Background Image */}
      <div className="flex h-44 bg-profileEleven bg-cover bg-fixed " />
      {/* Main Content Area */}
      <div className="mx-20">
        {/* Profile Overview */}
        <div className="flex items-center ">
          {/* Profile Picture */}
          <div className="flex h-44 w-44 -translate-y-8 items-center justify-center rounded-full bg-white">
            <div className="z-10 h-40 w-40  overflow-hidden rounded-full bg-white">
              <img
                src={
                  user.data?.profile_picture ||
                  "https://api.lorem.space/image/face?w=150&h=150"
                }
                alt={user.data?.first_name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {/* Name */}
          <div className="ml-8 mb-8">
            <h1 className="font-oswald text-4xl font-medium">
              {`${user.data?.first_name || ""} ${
                user.data?.last_name || ""
              }`.toUpperCase()}{" "}
              <span
                title={
                  emojiFlags.countryCode(user.data?.country_code || "DE").name
                }
              >
                {emojiFlags.countryCode(user.data?.country_code || "DE").emoji}
              </span>
            </h1>
            <p className="font-opensans font-light">
              {user.data?.job_title} at {user.data?.company}
            </p>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) =>
                user.data?.rating >= star ? (
                  <AiFillStar
                    key={`${star}-${user.data?.id}-f`}
                    className="text-xl text-yellow-400"
                  />
                ) : (
                  <AiOutlineStar
                    key={`${star}-${user.data?.id}-o`}
                    className="text-xl text-yellow-400"
                  />
                )
              )}
              <span className="ml-2 text-gray-500">
                {reviews.data?.length} reviews
              </span>
            </div>
          </div>
          {/* Edit Button */}
          <div className="ml-auto mb-8 flex flex-col items-center justify-center">
            {auth.user?.id === Number(userId) ? (
              <button
                type="button"
                className=" rounded-lg border-2 p-2 font-opensans text-gray-500 hover:bg-gray-200"
              >
                Edit Profile
              </button>
            ) : (
              mentor.data && (
                <button
                  type="button"
                  className=" rounded-lg  bg-mentorCTA p-2 font-opensans text-white hover:bg-mentorCTA500 disabled:bg-gray-400"
                  disabled={hasSentRequest}
                  onClick={() => handleSendRequest()}
                >
                  {hasSentRequest ? "Request Sent" : "Request Mentoring"}
                </button>
              )
            )}
          </div>
        </div>
        {/* Profile Overview */}
        <div className="w-full max-w-md px-2 py-16 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex space-x-1">
              {categories.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 font-opensans text-sm font-medium leading-5 text-mentorCTA outline-none",

                      selected
                        ? " border-b-2 border-mentorCTA"
                        : "text-gray-600 hover:text-mentorCTA"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <TabOverview
                  userId={userId}
                  userData={user.data}
                  mentorData={mentor.data || mentee.data}
                />
              </Tab.Panel>
              <Tab.Panel>
                <div>My Mentors</div>
              </Tab.Panel>
              <Tab.Panel>
                <div>Reviews</div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
