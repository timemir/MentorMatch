import React from "react";
import { VscSmiley } from "react-icons/vsc";
import { Link } from "react-router-dom";
import mentor from "../../assets/images/usertypes/mentor1.png";
import mentee from "../../assets/images/usertypes/mentee1.png";

export default function Onboarding() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <VscSmiley className="text-8xl text-mentorCTA" />
      <h1 className="mb-4 font-oswald text-4xl font-medium">
        Hello! What brings you to MentorMatch?
      </h1>
      <p className="mb-10 font-opensans font-light">
        Connect with our community of mentors and mentees from all around the
        world.
      </p>
      <div className="flex gap-4">
        {/* Button - Mentor */}
        <Link
          className="flex max-w-xs items-center justify-center rounded-lg bg-gray-100 transition hover:bg-mentorCTA hover:text-white focus:outline-none focus:ring-4 focus:ring-mentorCTA"
          to="/setup/mentor/step/1"
        >
          <div className="flex flex-col items-center gap-2 p-2">
            <img src={mentor} className="h-36 w-72 object-cover" alt="" />
            <h2 className="font-oswald text-2xl font-medium">Be a mentor</h2>
            <p className="text-center font-opensans font-light">
              Mentor the global community, and meet new mentees.
            </p>
          </div>
        </Link>
        {/* Button - Mentee */}
        <Link
          className="flex max-w-xs items-center justify-center rounded-lg bg-gray-100 transition hover:bg-mentorCTA hover:text-white focus:outline-none focus:ring-4 focus:ring-mentorCTA"
          to="/setup/mentee/step/1"
        >
          <div className="flex flex-col items-center gap-2 p-2">
            <img src={mentee} className="h-36 w-72 object-cover" alt="" />
            <h2 className="font-oswald text-2xl font-medium">
              Community mentee
            </h2>
            <p className="text-center font-opensans font-light">
              You will be able to book mentors, write reviews and much more.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
