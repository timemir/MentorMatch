import React from "react";
import { Link } from "react-router-dom";

export interface CardProps {
  id: number;
  title: string;
  description: string;
  buttonText: string; // Optional. if = "", then no button is rendered
  image: string;
  imageAlt: string;
  link?: string;
  matchScore?: number;
}
/*
  This component is used to display a card with an image, 
  title, description and an optional button.
*/
export default function Card({
  id,
  title,
  description,
  buttonText,
  image,
  imageAlt,
  link = "/",
  matchScore = 0,
}: CardProps) {
  return (
    <div
      data-testid="card"
      key={id}
      className="min-w-[80%] max-w-sm rounded-lg border bg-mentorPrimary700 shadow-md transition hover:z-10 hover:-translate-y-1 hover:bg-mentorCTA md:w-60 lg:w-64 xl:w-80 "
    >
      <Link data-testid="card-link" className="relative" to={link}>
        <img
          className=" h-48 max-h-96 w-full rounded-t-lg object-cover"
          src={image}
          alt={imageAlt}
        />
        {matchScore > 0 && (
          <div className="absolute top-0 right-0 m-1 flex flex-col items-center justify-center rounded-lg  bg-white ">
            <span className="rounded-t-lg bg-mentorCTA p-1 text-sm text-white">
              Match Score
            </span>
            <span
              className={`${
                matchScore >= 0.8 ? "text-red-800" : "text-gray-700"
              } text-sm`}
            >
              {matchScore >= 0.8
                ? `${matchScore * 100}% 🔥`
                : `${matchScore * 100}% `}
            </span>
          </div>
        )}
      </Link>
      <div className="px-5 py-2">
        <Link to={link}>
          <h5 className="mb-2 font-oswald text-2xl font-bold tracking-tight text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 h-6 truncate font-opensans font-normal text-mentorSecondary">
          {description}
        </p>
        {buttonText && (
          <Link
            to={link}
            className="inline-flex items-center rounded-lg bg-mentorCTA px-3 py-2 text-center text-sm font-medium text-white hover:bg-mentorCTA800 focus:outline-none focus:ring-4 focus:ring-mentorCTA300 "
          >
            {buttonText}
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

Card.defaultProps = {
  link: "/",
  matchScore: 0,
};
