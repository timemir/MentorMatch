/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../../api/api";
import useFilterStore from "../../store/filterStore";
import { MentorAndUser } from "../../types/mentors";
import CardList from "../UI/CardList/CardList";
import FilterBar from "../UI/FilterBar/FilterBar";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const dummyTopics = [
  {
    id: 11,
    title: "Managing People",
    description:
      "Understanding the process of training, motivating and directing your team members.",
    buttonText: "Learn more",
    image: "https://source.unsplash.com/random/400x200",
    imageAlt: "Managing People",
    link: "/topic/1",
  },
  {
    id: 12,
    title: "Working Remotely",
    description:
      "Making remote and globally disributed teams work for you and your needs.",
    buttonText: "Learn more",
    image: "https://source.unsplash.com/random/400x200",
    imageAlt: "Working Remotely",
    link: "/topic/2",
  },
];
const categories = ["Mentors", "Topics"];

type CardData = {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  imageAlt: string;
  link: string;
};

export default function TabInterface({ query }: { query: string }) {
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 25,
  });
  /* The zustand store that manages filtering parameters */
  const filterStore = useFilterStore();

  /* Creating a search query object that is used to fetch the data from the API. */
  const searchQuery = {
    user_input: filterStore.userInput,
    expertise_id: filterStore.expertise_id,
    level_id: filterStore.level_id,
    country_id: filterStore.country_id,
  };
  /* Fetching the data from the API. */
  const fetchedMentors = useQuery({
    queryKey: ["mentors"],
    queryFn: () =>
      api.mentors.getMentors(searchQuery, pagination.page, pagination.limit),
    retry: 1,
  });

  /* Setup of the states for mentors and topics. */
  const [mentors, setMentors] = useState<CardData[]>([]);
  const [topics, setTopics] = useState<CardData[]>([]);

  /* Setting the state of the topics. */
  useEffect(() => {
    setTopics(dummyTopics);
  }, []);

  /* If the user enters something from the homepage, set the filter parameter
  as the user input automatically. */
  // BUG: Mutation does not refetch, when the user enters something from the homepage.
  useEffect(() => {
    filterStore.setUserInput(query);
  }, [query]);

  /* Gets triggered when the refresh state in the filterStore changes.
  This happens, when the user presses the "Apply filters" Button 
  (located in the FilterBar component). Then the data gets refetched.
   */
  useEffect(() => {
    const { refresh } = filterStore;
    const { setRefresh } = filterStore;
    if (refresh) {
      fetchedMentors.refetch();
      setRefresh(false);
    }
  }, [filterStore.refresh]);

  // update mentors when fetchedMentors changes, so when the data is fetched.
  useEffect(() => {
    /* change fechtedMentors data to fit the CardData interface, so that 
    it can be displayed as a CardList. */
    const adjustedMentors = fetchedMentors.data?.map(
      (mentor: MentorAndUser) => {
        return {
          id: mentor.user_id,
          title: `${mentor.first_name} ${mentor.last_name}`,
          description: `${mentor.job_title || "Position"} at ${
            mentor.company || "Company"
          }`,
          buttonText: "",
          image:
            mentor.profile_picture ||
            "https://source.unsplash.com/random/400x200",
          imageAlt: `${mentor.first_name} ${mentor.last_name}`,
          link: `/profile/${mentor.user_id}`,
        };
      }
    );
    if (adjustedMentors) {
      setMentors(adjustedMentors);
    }
  }, [fetchedMentors.data]);

  return (
    <div className="w-full sm:px-0 md:px-4 md:py-16">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl  p-1">
          {/* Headings - Mentors & Topics */}
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 font-oswald text-sm font-medium leading-5 text-mentorCTA",
                  " text-2xl ring-white ring-opacity-60 ring-offset-2 ring-offset-mentorCTA400 focus:outline-none focus:ring-2",
                  selected
                    ? " border-b-2 border-mentorSecondary100 bg-mentorSecondary50 text-3xl font-bold shadow"
                    : "border-b-2 text-2xl text-mentorPrimary200 hover:bg-white/[0.12] hover:text-mentorCTA"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        {/* FilterBar */}
        <div className="mt-2">
          <FilterBar query={query} />
        </div>
        <Tab.Panels className="mt-2 w-full">
          {/* Data */}
          {[mentors, topics].map((array, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                " rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2"
              )}
            >
              {fetchedMentors.status === "loading" && (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-xl font-bold">Loading...</p>
                </div>
              )}
              {fetchedMentors.status === "error" &&
                fetchedMentors.failureReason?.message ===
                  "Error 404: Not Found" && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-xl font-bold">Nothing found</p>
                    <p className="text-gray-500">Please adjust your filter</p>
                  </div>
                )}
              {fetchedMentors.status === "error" &&
                fetchedMentors.failureReason?.message !==
                  "Error 404: Not Found" && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-xl font-bold">Error fetching data</p>
                  </div>
                )}
              {fetchedMentors.status === "success" && (
                <CardList key={uuidv4()} cardData={array} />
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
