/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import ButtonBack from "../../../components/Onboarding/ButtonBack/ButtonBack";
import useAuthStore from "../../../store/authStore";
import { useMentorOnboardingStore } from "../../../store/onboardingStore";
import { UserOnboard } from "../../../types/users";

const options = [
  {
    name: "Job seeking",
    value: "job",
  },
  {
    name: "Learning",
    value: "learn",
  },
  {
    name: "Personal Growth",
    value: "grow",
  },
  {
    name: "Career Change",
    value: "transition",
  },
  {
    name: "Not Sure",
    value: "notSure",
  },
];
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MentorStepFive({ step }: { step: number }) {
  const [selected, setSelected] = useState<string[]>([]);
  const mentorOnboardingStore = useMentorOnboardingStore();
  const auth = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    mentorOnboardingStore.setGoals(selected);
  }, [selected]);

  const isStoreValid = Object.values(mentorOnboardingStore).every((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== "";
  });

  function handleSelection(value: string) {
    setSelected((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  }

  const countryCodeQuery = useQuery({
    queryKey: ["countryCode", mentorOnboardingStore.country],
    queryFn: () => api.countries.getCountryCode(mentorOnboardingStore.country),
  });

  interface AddExpertisesArgs {
    mentor_id: number;
    expertise_ids: number[];
  }

  const mentorExpertisesMutation = useMutation({
    mutationFn: ({ mentor_id, expertise_ids }: AddExpertisesArgs) =>
      api.mentors.addExpertises(mentor_id, expertise_ids),
    onSuccess: () => {
      navigate("/dashboard");
    },
  });
  interface CreateMentorArgs {
    userId: number;
    userData: UserOnboard;
  }

  const mentorMutation = useMutation({
    mutationFn: ({ userId, userData }: CreateMentorArgs) =>
      api.mentors.createMentor(userId, userData),
    onSuccess: (data) => {
      const expertises = mentorOnboardingStore.expertises.map(
        (expertise) => expertise.id
      );

      mentorExpertisesMutation.mutate({
        mentor_id: data.dataMentor.id,
        expertise_ids: expertises,
      });
    },
  });

  function handleCreateMentor() {
    const [firstName, lastName] = mentorOnboardingStore.fullName.split(" ");

    const userData = {
      first_name: firstName,
      last_name: lastName,
      bio: mentorOnboardingStore.bio,
      company: mentorOnboardingStore.company,
      job_title: mentorOnboardingStore.jobTitle,
      country_code: countryCodeQuery.data.code,
      profile_picture: mentorOnboardingStore.profilePicture,
    };
    mentorMutation.mutate({ userId: auth.user.id, userData });
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Left Side */}
      <div className="min-h-screen pt-10 md:ml-4 md:border-r-2">
        <div className="flex flex-col justify-between">
          {/* Expertises */}
          <div className="mt-4 ml-10 flex flex-col gap-2">
            <span className="font-opensans font-medium">
              What topics do you want to mentor in? Please select one or many.
            </span>
          </div>
          {/* Goals */}
          <div className="ml-10 mt-4 flex min-w-max flex-col gap-2">
            <div className="w-full px-4 py-16">
              <div className="mx-auto w-full max-w-md">
                <div>
                  <ul className="space-y-2">
                    {options.map((option) => (
                      <button
                        type="button"
                        key={option.name}
                        onClick={() => handleSelection(option.value)}
                        className={`relative flex w-full cursor-pointer rounded-lg ${
                          selected.includes(option.value)
                            ? "bg-mentorCTA text-white"
                            : "bg-transparent text-black"
                        } px-5 py-4 shadow-md hover:bg-mentorCTA200 `}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <div className="font-medium">{option.name}</div>
                            </div>
                          </div>

                          <div
                            className={`shrink-0 text-white ${
                              selected.includes(option.value)
                                ? "block"
                                : "hidden"
                            }`}
                          >
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="mt-10 flex justify-between">
            <ButtonBack step={step} to="mentor">
              Back
            </ButtonBack>
            <button
              type="button"
              disabled={isStoreValid}
              className="mr-2 mb-2 rounded-lg bg-green-400 px-5 py-2.5 font-opensans text-sm font-medium text-white hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-mentorCTA300 disabled:cursor-not-allowed disabled:bg-gray-200"
              onClick={handleCreateMentor}
            >
              Finish
            </button>
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
