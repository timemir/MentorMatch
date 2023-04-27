import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { MentorAndUser } from "../../types/mentors";
import CardList from "../UI/CardList/CardList";

export default function PopularMentors() {
  // State for popular mentors

  // Fetch popular mentors
  const fetchedMentors = useQuery({
    queryKey: ["popularMentors"],
    queryFn: () => api.mentors.getMentors({}, 0, 6),
  });

  // Adjust fetched mentors to card props
  const adjustedMentors =
    fetchedMentors.data?.map((mentor: MentorAndUser) => {
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
    }) || [];

  return (
    <section id="popular-mentors" className="bg-gray-100 py-24">
      <div className="mx-14 flex justify-between">
        <h2 className=" font-oswald text-2xl font-bold">Popular Mentors</h2>
        <Link
          className="font-opensans text-mentorCTA hover:underline"
          to="/search"
        >
          Explore all mentors
        </Link>
      </div>
      <div id="popular-mentors-cards" className="mt-4">
        {fetchedMentors.isSuccess && <CardList cardData={adjustedMentors} />}
      </div>
    </section>
  );
}
