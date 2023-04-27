/* eslint-disable no-unsafe-optional-chaining */
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "flowbite-react";
import React, { useState } from "react";
import api from "../../../api/api";
import { Match } from "../../../types/matches";
import ChatMessageList from "../ChatMessageList/ChatMessageList";
import ChatToolbar from "../ChatToolbar/ChatToolbar";

export default function ChatBox() {
  // State for the match id
  const [activeMatch, setActiveMatch] = useState<number>(0);
  // State for the whole match data
  const [activeMatchData, setActiveMatchData] = useState<Match>();

  // Get the matches data of the current user
  const matches = useQuery({
    queryKey: ["matches"],
    queryFn: api.matches.getMatches,
  });

  return (
    <div className="box-content h-fit rounded-lg border-2 pl-2 md:grid md:max-h-96 md:grid-cols-4">
      {/* All matches */}
      <div className="min-h-96 flex max-h-96 space-x-2 overflow-scroll pr-2 scrollbar-hide md:block md:space-x-0">
        {matches &&
          matches.data &&
          [
            ...matches.data?.matches_as_mentor,
            ...matches.data?.matches_as_mentee,
          ]
            ?.filter((match) => match.status === "active")
            .map((match) => (
              <>
                <button
                  type="button"
                  className={`relative my-1 flex h-16 w-full items-center justify-center space-x-2 rounded-lg p-2 lg:justify-start ${
                    activeMatch === match.id
                      ? "bg-mentorCTA text-white "
                      : "bg-gray-100"
                  } hover:bg-mentorCTA hover:text-white`}
                  onClick={() => {
                    setActiveMatch(match.id);
                    setActiveMatchData(match);
                  }}
                >
                  <Avatar
                    className="min-w-max"
                    img={
                      match.mentor?.user?.profile_picture ||
                      match.mentee?.user?.profile_picture
                    }
                    size="md"
                  />
                  <span className="hidden truncate lg:flex">{`${
                    match.mentor?.user?.first_name ||
                    match.mentee?.user?.first_name
                  } ${
                    match.mentor?.user?.last_name ||
                    match.mentee?.user?.last_name
                  }`}</span>
                  <span className="absolute top-0 right-0 hidden rounded-l-lg rounded-b-lg bg-mentorCTA p-1 text-xs text-white lg:block">
                    {match.mentee ? "Mentee" : "Mentor"}
                  </span>
                </button>
                <hr />
              </>
            ))}
      </div>
      {/* Chat */}
      <div className="relative h-96  border-l-2 md:col-span-3">
        {/* Messages */}
        <ChatMessageList
          activeMatchId={activeMatch}
          matchData={activeMatchData as Match}
        />
        {/* Input Bar */}
        <ChatToolbar
          activeMatchId={activeMatch}
          matchData={activeMatchData as Match}
        />
      </div>
    </div>
  );
}
