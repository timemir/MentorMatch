/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import ButtonBack from "../../../components/Onboarding/ButtonBack/ButtonBack";
import ComboboxOnboarding from "../../../components/Onboarding/Combobox/ComboboxOnboarding";
import useAuthStore from "../../../store/authStore";
import { useMenteeOnboardingStore } from "../../../store/onboardingStore";
import { UserOnboard } from "../../../types/users";

const roles = [
  { id: 1, name: "Entry Level" },
  { id: 2, name: "Intermediate" },
  { id: 3, name: "Senior" },
  { id: 4, name: "Expert" },
  { id: 5, name: "Master" },
];

export default function MenteeStepFive({ step }: { step: number }) {
  const navigate = useNavigate();
  const menteeOnboardingStore = useMenteeOnboardingStore();
  const auth = useAuthStore();
  const countries = useQuery({
    queryKey: ["countries"],
    queryFn: () => api.countries.getCountries(),
  });

  const isStoreValid = Object.values(menteeOnboardingStore).every((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== "";
  });

  const countryCodeQuery = useQuery({
    queryKey: ["countryCode", menteeOnboardingStore.country],
    queryFn: () => api.countries.getCountryCode(menteeOnboardingStore.country),
  });

  interface AddExpertisesArgs {
    mentee_id: number;
    expertise_ids: number[];
  }

  const menteeExpertisesMutation = useMutation({
    mutationFn: ({ mentee_id, expertise_ids }: AddExpertisesArgs) =>
      api.mentees.addExpertises(mentee_id, expertise_ids),
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  // Define a type for the argument passed to the mutation function
  interface CreateMenteeArgs {
    userId: number;
    userData: UserOnboard;
  }

  const menteeMutation = useMutation({
    mutationFn: ({ userId, userData }: CreateMenteeArgs) =>
      api.mentees.createMentee(userId, userData),
    onSuccess: (data) => {
      const expertises = menteeOnboardingStore.expertises.map(
        (expertise) => expertise.id
      );

      menteeExpertisesMutation.mutate({
        mentee_id: data.dataMentee.id,
        expertise_ids: expertises,
      });
    },
  });

  function handleCreateMentee() {
    const [firstName, lastName] = menteeOnboardingStore.fullName.split(" ");

    const userData = {
      first_name: firstName,
      last_name: lastName,
      bio: menteeOnboardingStore.bio,
      company: menteeOnboardingStore.company,
      job_title: menteeOnboardingStore.jobTitle,
      country_code: countryCodeQuery.data.code,
      profile_picture: menteeOnboardingStore.profilePicture,
    };
    menteeMutation.mutate({ userId: auth.user.id, userData });
  }
  return (
    <div className="flex min-h-screen flex-col">
      {/* Left Side */}
      <div className="min-h-screen pt-10 md:ml-4 md:border-r-2">
        <div className="flex flex-col justify-between">
          <h1 className="mt-4 ml-4 mb-8">Who is a relevant Mentor for you?</h1>
          {/* preferred Mentor Roles */}
          <div className="mt-4 ml-10 flex flex-col gap-2">
            <span className="font-opensans font-medium">
              Which roles would you like to speak to?
            </span>
            <ComboboxOnboarding
              className="z-50 max-w-sm"
              title="Select Roles (one or many)"
              data={roles}
              state={[
                menteeOnboardingStore.prefferedMentorRoles,
                menteeOnboardingStore.setPrefferedMentorRoles,
              ]}
            />
          </div>
          {/* preferred Mentor Country */}
          <div className="mt-4 ml-10 flex flex-col gap-2">
            <span className="font-opensans font-medium">
              Which countries do you prefer you mentor from?
            </span>
            <ComboboxOnboarding
              className="max-w-sm"
              title="Select Countries (one or many)"
              data={countries.data || []}
              state={[
                menteeOnboardingStore.prefferedMentorCountries,
                menteeOnboardingStore.setPrefferedMentorCountries,
              ]}
            />
          </div>
          {/* Navigation Actions */}
          <div className="mt-10 flex justify-between">
            <ButtonBack step={step} to="mentee">
              Back
            </ButtonBack>
            <button
              type="button"
              disabled={!isStoreValid}
              className="mr-2 mb-2 rounded-lg bg-green-400 px-5 py-2.5 font-opensans text-sm font-medium text-white hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-mentorCTA300 disabled:cursor-not-allowed disabled:bg-gray-200"
              onClick={handleCreateMentee}
            >
              Finish
            </button>
          </div>
          <div className="flex justify-end">
            {menteeMutation.isLoading && (
              <span className="mr-2 mb-2 rounded-full bg-yellow-400 px-5 py-1 font-opensans text-sm font-medium text-white hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-mentorCTA300 disabled:cursor-not-allowed disabled:bg-gray-200">
                Loading...
              </span>
            )}
            {menteeMutation.isError && (
              <span className="mr-2 mb-2 rounded-full bg-red-400 px-5 py-1 font-opensans text-sm font-medium text-white hover:bg-red-300 focus:outline-none focus:ring-4 focus:ring-mentorCTA300 disabled:cursor-not-allowed disabled:bg-gray-200">
                Error, Try again.
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Right Side */}
      {/* <div className="hidden md:block">
        <Profile />
      </div> */}
    </div>
  );
}
