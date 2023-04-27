import { Tab } from "@headlessui/react";
import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";

// Helper function to combine class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
// TODO: Replace with actual user type
export type UserType = {
  id: number;
  bio: string;
  company: string;
  country: string;
  fullName: string;
  expertises: { id: number; name: string }[];
  jobTitle: string;
  profilePicture: string;
};

/* 
  This component is a preview of the user's profile. 
  It is used in the onboarding process.
*/
export default function PreviewProfile({ data }: any) {
  const [user, setUser] = useState<UserType>({
    id: 1,
    bio: "",
    company: "",
    country: "",
    fullName: "",
    expertises: [],
    jobTitle: "",
    profilePicture: "",
  });
  const [showAll, setShowAll] = useState<boolean>(false);
  // State is not optimal for this static data. TODO: Refactor
  const [categories] = useState<string[]>(["Overview"]);

  useEffect(() => {
    setUser(data);
  }, [data]);
  return (
    <div>
      {/* Background Image */}
      <div className="flex h-44 bg-gray-200">
        {/* <img className="h-full w-full object-cover" /> */}
      </div>
      {/* Main Content Area */}
      <div className="mx-20">
        {/* Profile Overview */}
        <div className="flex items-center ">
          {/* Profile Picture */}
          <div className="flex h-44 w-44 -translate-y-8 items-center justify-center rounded-full bg-white">
            <div className="z-10 h-40 w-40  overflow-hidden rounded-full bg-white">
              {/* <img
                src={
                  user?.profilePicture ||
                  "https://api.lorem.space/image/face?w=150&h=150"
                }
                alt={user?.fullName}
                className="h-full w-full object-cover"
              /> */}
              <Avatar
                alt={user?.fullName}
                size="xl"
                rounded
                img={user?.profilePicture || ""}
              />
            </div>
          </div>
          {/* Name */}
          <div className="ml-8 mb-8">
            <h1 className="font-oswald text-4xl font-medium">
              {user?.fullName.toUpperCase() || "Name"}{" "}
            </h1>
            <p className="font-opensans font-light">
              {`${user.jobTitle || "Title"} at ${user.company || "Company"}`}
            </p>
          </div>
          {/* Edit Button */}
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
                <div className="space-y-4">
                  {/* Bio */}
                  <div>
                    <h2 className="text-xl font-semibold">Bio</h2>
                    {user?.bio.split("\n").map((line, index) => (
                      <p key={index}>
                        {line}
                        <br />
                      </p>
                    ))}
                  </div>
                  {/* Expertise */}
                  <div>
                    <h2 className="text-xl font-semibold">Expertises</h2>
                    <div className="inline-block">
                      {(showAll
                        ? user.expertises
                        : user.expertises.slice(0, 6)
                      ).map((expertise) => (
                        <span
                          key={expertise.id}
                          className="m-1 inline-flex rounded-lg bg-mentorCTA50 py-2 px-4 text-mentorCTA"
                        >
                          {expertise.name}
                        </span>
                      ))}
                      {user.expertises.length > 6 && showAll === false && (
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
                      {user.expertises.length > 6 && showAll === true && (
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
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
