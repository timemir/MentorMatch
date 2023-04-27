import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function SearchBar() {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  // React Router hook to navigate to the search page
  const navigate = useNavigate();

  // Query to get the popular categories
  // TODO: Actually get popular categories and not just the first 10
  const popularCategories = useQuery({
    queryKey: ["popularCategories"],
    queryFn: () => api.expertises.getExpertises(0, 9),
  });

  // Function to handle the change of the search query
  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    // TODO: Optimization: Add debouncing
    setSearchQuery(event.target.value);
  }

  /* Function to handle the search, i.e. navigate to the search page
  with the search query as a query parameter */
  function handleSearch() {
    navigate(`/search?q=${searchQuery}`);
  }

  // Function to handle the click on a popular search category
  function handlePopularSearch(e: React.MouseEvent<HTMLButtonElement>) {
    const button = e.target as HTMLButtonElement; // to make TypeScript happy
    navigate(`/search?q=${button.innerHTML}`);
  }

  return (
    <div className="mt-2">
      <form className="flex">
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="e.g. Software Engineering"
          className="flex w-full rounded-md rounded-r-none border-2 border-r-0 p-2 shadow-lg placeholder:font-opensans active:border-mentorCTA"
        />
        <button
          type="submit"
          className="rounded-r-lg bg-mentorCTA p-2 font-opensans text-white hover:bg-mentorCTA800"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
      <div id="cards" className="mt-4">
        {popularCategories.data?.map(({ id, name }) => (
          <button
            type="button"
            key={id}
            className="mx-1 my-0.5 cursor-pointer rounded-full border-2  border-mentorCTA p-1 px-2 font-opensans text-mentorCTA hover:bg-mentorCTA hover:text-white focus:bg-mentorCTA focus:text-white"
            onClick={handlePopularSearch}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
