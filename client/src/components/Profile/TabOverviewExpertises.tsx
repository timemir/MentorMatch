import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "../../api/api";
import { Expertise } from "../../types/expertises";

const dummyExpertises = [
  {
    id: 1,
    name: "React",
  },
  {
    id: 2,
    name: "Software Engineering",
  },
  {
    id: 3,
    name: "JavaScript",
  },
  {
    id: 4,
    name: "TypeScript",
  },
  {
    id: 5,
    name: "Node.js",
  },
  {
    id: 6,
    name: "Express.js",
  },
  {
    id: 7,
    name: "MongoDB",
  },
  {
    id: 8,
    name: "SQL",
  },
];
const LIMIT = 6;

/*
  This component is used in the Profile component to display
  the expertises of the user inside overview tab.
*/
export default function TabOverviewExpertises({
  userId,
  mentorId,
}: {
  userId: string | undefined;
  mentorId: number;
}) {
  const [expertises, setExpertises] = useState<Expertise[]>([]);
  const [showAll, setShowAll] = useState(false);
  // TODO: Fetch expertises with userId from backend

  const fetchedExpertises = useQuery({
    queryKey: ["expertises", mentorId],
    queryFn: () => api.mentors.getExpertises(mentorId),
    onSuccess: (data) => {
      setExpertises(data);
    },
    enabled: !!mentorId,
  });

  return (
    <div className="inline-block">
      {(showAll ? expertises : expertises.slice(0, LIMIT)).map((expertise) => (
        <span
          key={expertise.id}
          className="m-1 inline-flex rounded-lg bg-mentorCTA50 py-2 px-4 text-mentorCTA"
        >
          {expertise.name}
        </span>
      ))}
      {expertises.length > LIMIT && showAll === false && (
        <div className="inline-block">
          <button
            type="button"
            className="rounded-lg border-2 p-2 font-opensans text-gray-500 hover:bg-gray-200"
            onClick={() => setShowAll(true)}
          >
            See More
          </button>
        </div>
      )}
      {expertises.length > LIMIT && showAll === true && (
        <div className="inline-block">
          <button
            type="button"
            className="rounded-lg border-2 p-2 font-opensans text-gray-500 hover:bg-gray-200"
            onClick={() => setShowAll(false)}
          >
            See Less
          </button>
        </div>
      )}
    </div>
  );
}
