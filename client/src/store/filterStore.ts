import { create } from "zustand";

interface FilterState {
  userInput: string;
  expertise_id: number;
  country_id: string;
  level_id: number;
  refresh: boolean;
  setUserInput: (newUserInput: string) => void;
  setExpertise: (newExpertise_id: number) => void;
  setCountry: (newCountry_id: string) => void;
  setLevel: (newLevel_id: number) => void;
  setRefresh: (newRefresh: boolean) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  userInput: "",
  expertise_id: 0,
  country_id: "",
  level_id: 0,
  refresh: false,
  setUserInput: (newUserInput: string) => set({ userInput: newUserInput }),
  setExpertise: (newExpertise_id: number) =>
    set({ expertise_id: newExpertise_id }),
  setCountry: (newCountry_id: string) => set({ country_id: newCountry_id }),
  setLevel: (newLevel_id: number) => set({ level_id: newLevel_id }),
  setRefresh: (newRefresh: boolean) => set({ refresh: newRefresh }),
}));

export default useFilterStore;
