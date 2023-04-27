import { create } from "zustand";

// Mentee Store
interface MenteeOnboardingState {
  profilePicture: string;
  fullName: string;
  gender: string;
  country: string;
  expertises: { id: number; name: string }[];
  company: string;
  jobTitle: string;
  bio: string;
  goals: string[];
  prefferedMentorRoles: string[];
  prefferedMentorCountries: string[];

  setProfilePicture: (newProfilePicture: string) => void;
  setFullName: (newFullName: string) => void;
  setGender: (newGender: string) => void;
  setCountry: (newCountry: string) => void;
  setExpertises: (newExpertises: { id: number; name: string }[]) => void;
  setCompany: (newCompany: string) => void;
  setJobTitle: (newJobTitle: string) => void;
  setBio: (newBio: string) => void;
  setGoals: (newGoals: string[]) => void;
  setPrefferedMentorRoles: (newPrefferedMentorRoles: string[]) => void;
  setPrefferedMentorCountries: (newPrefferedMentorCountries: string[]) => void;
}

export const useMenteeOnboardingStore = create<MenteeOnboardingState>()(
  (set) => ({
    profilePicture: "",
    fullName: "",
    gender: "",
    country: "",
    expertises: [],
    company: "",
    jobTitle: "",
    bio: "",
    goals: [],
    prefferedMentorRoles: [],
    prefferedMentorCountries: [],
    setProfilePicture: (newProfilePicture) => {
      set((state) => ({
        ...state,
        profilePicture: newProfilePicture,
      }));
    },
    setFullName: (newFullName) => {
      set((state) => ({
        ...state,
        fullName: newFullName,
      }));
    },
    setGender: (newGender) => {
      set((state) => ({
        ...state,
        gender: newGender,
      }));
    },
    setCountry: (newCountry) => {
      set((state) => ({
        ...state,
        country: newCountry,
      }));
    },
    setExpertises: (newExpertises) => {
      set((state) => ({
        ...state,
        expertises: newExpertises,
      }));
    },
    setCompany: (newCompany) => {
      set((state) => ({
        ...state,
        company: newCompany,
      }));
    },
    setJobTitle: (newJobTitle) => {
      set((state) => ({
        ...state,
        jobTitle: newJobTitle,
      }));
    },
    setBio: (newBio) => {
      set((state) => ({
        ...state,
        bio: newBio,
      }));
    },
    setGoals: (newGoals) => {
      set((state) => ({
        ...state,
        goals: newGoals,
      }));
    },
    setPrefferedMentorRoles: (newPrefferedMentorRoles) => {
      set((state) => ({
        ...state,
        prefferedMentorRoles: newPrefferedMentorRoles,
      }));
    },
    setPrefferedMentorCountries: (newPrefferedMentorCountries) => {
      set((state) => ({
        ...state,
        prefferedMentorCountries: newPrefferedMentorCountries,
      }));
    },
  })
);

// Mentor Store
interface MentorOnboardingState {
  profilePicture: string;
  fullName: string;
  gender: string;
  country: string;
  expertises: { id: number; name: string }[];
  company: string;
  jobTitle: string;
  bio: string;
  level: string;
  linkedIn: string;
  goals: string[];
  languages: string[];
  // prefferedMentoringTopics: string[];

  setProfilePicture: (newProfilePicture: string) => void;
  setFullName: (newFullName: string) => void;
  setGender: (newGender: string) => void;
  setCountry: (newCountry: string) => void;
  setExpertises: (newExpertises: { id: number; name: string }[]) => void;
  setCompany: (newCompany: string) => void;
  setJobTitle: (newJobTitle: string) => void;
  setBio: (newBio: string) => void;
  setLevel: (newLevel: string) => void;
  setLinkedIn: (newLinkedIn: string) => void;
  setGoals: (newGoals: string[]) => void;
  setLanguages: (newLanguages: string[]) => void;
  // setPrefferedMentoringTopics: (newPrefferedMentoringTopics: string[]) => void;
}

export const useMentorOnboardingStore = create<MentorOnboardingState>()(
  (set) => ({
    profilePicture: "",
    fullName: "",
    gender: "",
    country: "",
    expertises: [],
    company: "",
    jobTitle: "",
    bio: "",
    level: "",
    linkedIn: "",
    goals: [],
    languages: [],
    // prefferedMentoringTopics: [],
    setProfilePicture: (newProfilePicture) => {
      set((state) => ({
        ...state,
        profilePicture: newProfilePicture,
      }));
    },
    setFullName: (newFullName) => {
      set((state) => ({
        ...state,
        fullName: newFullName,
      }));
    },
    setGender: (newGender) => {
      set((state) => ({
        ...state,
        gender: newGender,
      }));
    },
    setCountry: (newCountry) => {
      set((state) => ({
        ...state,
        country: newCountry,
      }));
    },
    setExpertises: (newExpertises) => {
      set((state) => ({
        ...state,
        expertises: newExpertises,
      }));
    },
    setCompany: (newCompany) => {
      set((state) => ({
        ...state,
        company: newCompany,
      }));
    },
    setJobTitle: (newJobTitle) => {
      set((state) => ({
        ...state,
        jobTitle: newJobTitle,
      }));
    },
    setBio: (newBio) => {
      set((state) => ({
        ...state,
        bio: newBio,
      }));
    },
    setLevel: (newLevel) => {
      set((state) => ({
        ...state,
        level: newLevel,
      }));
    },
    setLinkedIn: (newLinkedIn) => {
      set((state) => ({
        ...state,
        linkedIn: newLinkedIn,
      }));
    },
    setGoals: (newGoals) => {
      set((state) => ({
        ...state,
        goals: newGoals,
      }));
    },
    setLanguages: (newLanguages) => {
      set((state) => ({
        ...state,
        languages: newLanguages,
      }));
    },
    // setPrefferedMentoringTopics: (newPrefferedMentoringTopics) => {
    //   set((state) => ({
    //     ...state,
    //     prefferedMentoringTopics: newPrefferedMentoringTopics,
    //   }));
    // },
  })
);
