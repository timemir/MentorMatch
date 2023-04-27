import React from "react";
import { Link } from "react-router-dom";

export default function ButtonBack({
  to,
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
  to: string;
}) {
  return (
    <Link
      className="mr-2 mb-2 rounded-lg bg-mentorCTA px-5 py-2.5 font-opensans text-sm font-medium text-white hover:bg-mentorCTA800 focus:outline-none focus:ring-4 focus:ring-mentorCTA300"
      to={`/setup/${to}/step/${step - 1}`}
    >
      <span>{children}</span>
    </Link>
  );
}
