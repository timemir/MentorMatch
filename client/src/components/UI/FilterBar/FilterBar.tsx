import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "../../../api/api";
import useFilterStore from "../../../store/filterStore";
import { FilterComboboxData } from "../../../types/filterComboboxData";
import FilterCombobox from "../../FilterCombobox/FilterCombobox";

const levelData = [
  { id: 1, name: "Entry Level" },
  { id: 2, name: "Intermediate" },
  { id: 3, name: "Senior" },
  { id: 4, name: "Expert" },
  { id: 5, name: "Master" },
];

/*
  This component is used to display the filter bar.
*/
export default function FilterBar({ query }: { query: string }) {
  /* 
  State for the search query inside the search bar.
  Accepts the query from the SearchBar Component inside Homescreen 
  */
  const [searchQuery, setSearchQuery] = useState(query || "");

  // Filter Store for storing the filter data
  const filterStore = useFilterStore();

  /* 
  Function to handle a click on the filter button. 
  Sets the refresh state to true to trigger a re-fetch of the data inside
  the Searchscreen Component.
  */
  function handleFiltering(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    filterStore.setRefresh(true);
  }
  // Function to handle a change in the search bar
  function handleChangeSearchQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    filterStore.setUserInput(event.target.value);
  }

  // Get Country Data from Backend
  const countries = useQuery({
    queryKey: ["countries"],
    queryFn: api.countries.getCountries,
  });

  // Get Expertise Data from Backend
  const expertises = useQuery({
    queryKey: ["expertises"],
    queryFn: () => api.expertises.getExpertises(),
  });

  return (
    <form className="m-4 flex flex-col items-center justify-between md:flex-row ">
      <input
        className="mr-2 w-full flex-1 rounded-lg border-2 p-2 placeholder:truncate placeholder:font-opensans md:w-fit"
        type="text"
        value={searchQuery}
        onChange={handleChangeSearchQuery}
        name=""
        id=""
        placeholder="Search by company, role or language"
      />
      <FilterCombobox
        title="Expertise"
        data={expertises.data as FilterComboboxData[]}
        filterStoreFN={filterStore.setExpertise}
        className="z-50 w-full md:w-fit"
      />
      <FilterCombobox
        title="Level"
        data={levelData}
        filterStoreFN={filterStore.setLevel}
        className="z-40 w-full md:w-fit"
      />
      <FilterCombobox
        title="Country"
        data={countries.data as FilterComboboxData[]}
        filterStoreFN={filterStore.setCountry}
        className="z-30 w-full md:w-fit"
      />
      <button
        className="ml-4 mt-3 rounded-lg bg-mentorCTA p-2 font-opensans text-white md:mt-0"
        type="submit"
        onClick={handleFiltering}
      >
        Apply Filter
      </button>
    </form>
  );
}
