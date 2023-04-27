import { Avatar, Sidebar } from "flowbite-react";
import React, { useState } from "react";
import { BiBuoy } from "react-icons/bi";
import {
  HiAcademicCap,
  HiCog,
  HiInbox,
  HiSparkles,
  HiVideoCamera,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import Home from "./Home";
import Inbox from "./Inbox";
import Matches from "./Matches";
import Meetings from "./Meetings";
import Settings from "./Settings";
import Support from "./Support";

const devCheck = false;
export default function Dashboard() {
  const auth = useAuthStore();
  const [activeTab, setActiveTab] = useState<string>(
    JSON.parse(localStorage.getItem("activeTab") || "null") || "home"
  );

  function handleActiveTab(tabName: string) {
    setActiveTab(tabName);
    localStorage.setItem("activeTab", JSON.stringify(tabName));
  }
  // if (!auth.isLoggedIn) return <div>Not logged in</div>;
  // DEV:
  if (devCheck) return <div>Not logged in</div>;
  return (
    <div className="relative flex pt-16 md:pt-0">
      {/* Mobile Bottom Nav Tabs */}
      <div className="absolute top-0 mt-1 h-16 w-full overflow-hidden rounded-lg bg-mentorPrimary md:hidden">
        {/* Nav Button Group */}
        <div className="flex h-full w-full grid-cols-4">
          {/* Home */}

          <button
            type="button"
            onClick={() => handleActiveTab("home")}
            className={`  flex flex-1 items-center justify-center hover:bg-mentorCTA50 hover:text-mentorCTA ${
              activeTab === "home" &&
              "bg-mentorCTA text-white hover:bg-transparent "
            }}`}
          >
            <HiViewBoards className="text-3xl text-white" />
          </button>
          {/* Matches */}
          <button
            type="button"
            onClick={() => handleActiveTab("matches")}
            className={`flex flex-1 items-center justify-center hover:bg-mentorCTA50 hover:text-mentorCTA ${
              activeTab === "matches" &&
              "bg-mentorCTA text-white hover:bg-transparent "
            }}`}
          >
            <HiSparkles className="text-3xl text-white" />
          </button>
          {/* Inbox */}
          <button
            type="button"
            onClick={() => handleActiveTab("inbox")}
            className={`flex flex-1 items-center justify-center hover:bg-mentorCTA50 hover:text-mentorCTA ${
              activeTab === "inbox" &&
              "bg-mentorCTA text-white hover:bg-transparent "
            }}`}
          >
            <HiInbox className="text-3xl text-white" />
          </button>
          {/* Meetings */}
          <button
            type="button"
            onClick={() => handleActiveTab("meetings")}
            className={`flex flex-1 items-center justify-center hover:bg-mentorCTA50 hover:text-mentorCTA ${
              activeTab === "meetings" &&
              "bg-mentorCTA text-white hover:bg-transparent "
            }}`}
          >
            <HiVideoCamera className="text-3xl text-white" />
          </button>
        </div>
      </div>
      <div className="hidden h-screen w-fit  md:block">
        <Sidebar>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href={`/profile/${auth.user?.id}`}
                className="group hover:bg-transparent"
              >
                <Avatar size="lg" rounded img={auth.user?.profile_picture} />
                <div className="flex max-w-xs flex-col items-center space-y-1 font-medium dark:text-white">
                  <div className=" truncate text-lg font-semibold">
                    {`${auth.user?.first_name || "Bruh"}
                        ${auth.user?.last_name || "not logged in"} `}
                  </div>
                  <Link
                    to={`/profile/${auth.user?.id}`}
                    className="text-xs text-gray-500 group-hover:text-mentorCTA dark:text-gray-400"
                  >
                    View Profile
                  </Link>
                </div>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiViewBoards}
                className={`hover:bg-mentorCTA50 hover:text-mentorCTA ${
                  activeTab === "home" &&
                  "bg-mentorCTA text-white hover:bg-transparent "
                }}`}
                onClick={() => handleActiveTab("home")}
              >
                Home
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiSparkles}
                className={`hover:bg-mentorCTA50 hover:text-mentorCTA ${
                  activeTab === "matches" &&
                  "bg-mentorCTA text-white hover:bg-transparent "
                }}`}
                onClick={() => handleActiveTab("matches")}
              >
                Matches
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiInbox}
                className={`hover:bg-mentorCTA50 hover:text-mentorCTA ${
                  activeTab === "inbox" &&
                  "bg-mentorCTA text-white hover:bg-transparent "
                }}`}
                onClick={() => handleActiveTab("inbox")}
              >
                Inbox
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiVideoCamera}
                className={`hover:bg-mentorCTA50 hover:text-mentorCTA ${
                  activeTab === "meetings" &&
                  "bg-mentorCTA text-white hover:bg-transparent "
                }}`}
                onClick={() => handleActiveTab("meetings")}
              >
                Meetings
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={HiCog}
                className={`hover:bg-mentorCTA50 hover:text-mentorCTA ${
                  activeTab === "settings" &&
                  "bg-mentorCTA text-white hover:bg-transparent "
                }}`}
                onClick={() => handleActiveTab("settings")}
              >
                Settings
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiAcademicCap}
                className="hover:bg-mentorCTA50 hover:text-mentorCTA"
                onClick={() => handleActiveTab("become-mentor")}
              >
                Become a mentor
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={BiBuoy}
                className="hover:bg-mentorCTA50 hover:text-mentorCTA"
                onClick={() => handleActiveTab("support")}
              >
                Support
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      {/* TODO: Based on selected tab, render different components */}
      {/* dashboard/matches */}
      {/* dashboad/mesages */}
      {/* etc */}
      {activeTab === "home" && <Home />}
      {activeTab === "matches" && <Matches />}
      {activeTab === "inbox" && <Inbox />}
      {activeTab === "meetings" && <Meetings />}
      {activeTab === "settings" && <Settings />}
      {activeTab === "become-mentor" && <div>Become a mentor</div>}
      {activeTab === "support" && <Support />}
    </div>
  );
}
