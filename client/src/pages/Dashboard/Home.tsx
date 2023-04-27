import { Carousel } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import CardList from "../../components/UI/CardList/CardList";
import api from "../../api/api";
import { MatchSuggestion } from "../../types/matches";
import useAuthStore from "../../store/authStore";

export default function Home() {
  const auth = useAuthStore();

  const matchSuggestions = useQuery({
    queryKey: ["matchSuggestions"],
    queryFn: api.matches.getMatchesSuggestions,
    enabled: !auth.user?.is_mentor,
  });

  return (
    <div className="w-screen md:p-16">
      <h1 className="mb-4 font-oswald text-5xl">Welcome</h1>
      <p className="mb-10">You have no upcoming sessions</p>
      <hr className="pb-4" />
      {!auth.user?.is_mentor && (
        <>
          <div className="flex justify-between">
            <h2 className="font-oswald text-xl">Your top matches</h2>
            <div className="text-mentorCTA">Show all suggestions</div>
          </div>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slide={false}>
              {matchSuggestions.data &&
                [1, 2, 3].map((div, idx) => (
                  <div key={div} className="">
                    <CardList
                      cardData={matchSuggestions.data
                        ?.slice(idx * 3, (idx + 1) * 3)
                        .map((matchSuggestion: MatchSuggestion) => {
                          return {
                            id: matchSuggestion.mentor.id,
                            title: `${matchSuggestion?.mentor?.user?.first_name} ${matchSuggestion?.mentor?.user?.last_name}`,
                            description: "",
                            buttonText: "",
                            image:
                              matchSuggestion?.mentor?.user?.profile_picture,
                            imageAlt: `${matchSuggestion?.mentor?.user?.first_name} ${matchSuggestion?.mentor?.user?.last_name}`,
                            matchScore: matchSuggestion.score.toFixed(2),
                            link: `/profile/${matchSuggestion.mentor.user_id}`,
                          };
                        })}
                    />
                  </div>
                ))}
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
}
