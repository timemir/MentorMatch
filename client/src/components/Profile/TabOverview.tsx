/* eslint-disable indent */
// eslint-disable-next-line import/no-cycle
import React from "react";
import { Mentor } from "../../types/mentors";
import { User } from "../../types/users";
import TabOverviewExpertises from "./TabOverviewExpertises";

/*
  This component is used in the Profile component to display the overview tab.
*/
export default function TabOverview({
  userId,
  userData,
  mentorData,
}: {
  userId: string | undefined;
  userData: User;
  mentorData: Mentor | undefined;
}) {
  return (
    <div className="space-y-4">
      {/* Bio */}
      <div>
        <h2 className="text-xl font-semibold">Bio</h2>
        {/* TODO: Think of something more elegant than this */}
        {mentorData ? (
          mentorData?.description?.includes("\n") ? (
            mentorData?.description?.split("\n").map((line, index) => (
              <p key={index}>
                {line}
                <br />
              </p>
            ))
          ) : (
            <p>{mentorData?.description}</p>
          )
        ) : userData?.bio?.includes("\n") ? (
          userData?.bio?.split("\n").map((line, index) => (
            <p key={index}>
              {line}
              <br />
            </p>
          ))
        ) : (
          <p>{userData?.bio}</p>
        )}
      </div>
      {/* Expertise */}
      <div>
        <h2 className="text-xl font-semibold">Expertises</h2>
        <TabOverviewExpertises
          userId={userId}
          mentorId={mentorData?.id as number}
        />
      </div>
    </div>
  );
}
