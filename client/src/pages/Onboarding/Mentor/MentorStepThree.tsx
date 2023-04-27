/* eslint-disable jsx-a11y/label-has-associated-control */
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import api from "../../../api/api";
import ButtonBack from "../../../components/Onboarding/ButtonBack/ButtonBack";
import ButtonNext from "../../../components/Onboarding/ButtonNext/ButtonNext";
import ComboboxOnboarding from "../../../components/Onboarding/Combobox/ComboboxOnboarding";
import DropdownSelect from "../../../components/UI/Listbox/DropdownSelect";
import {
  useMenteeOnboardingStore,
  useMentorOnboardingStore,
} from "../../../store/onboardingStore";

const expertiseData = [
  { id: 1, name: "Data Science" },
  { id: 2, name: "Web Development" },
  { id: 3, name: "Chemistry" },
  { id: 4, name: "Machine Learning" },
  { id: 5, name: "Computer Science" },
  { id: 6, name: "Physics" },
  { id: 7, name: "Biology" },
  { id: 8, name: "Environmental Science" },
  { id: 9, name: "Geology" },
  { id: 10, name: "Mathematics" },
];

export default function MentorStepThree({ step }: { step: number }) {
  const [level, languages, linkedIn, setLevel, setLanguages, setLinkedIn] =
    useMentorOnboardingStore((state) => [
      state.level,
      state.languages,
      state.linkedIn,
      state.setLevel,
      state.setLanguages,
      state.setLinkedIn,
    ]);

  const fetchedLanguages = useQuery({
    queryKey: ["languages"],
    queryFn: () => api.countries.getCountries(),
  });

  function handleChangeLanguages(e: React.ChangeEvent<HTMLInputElement>) {
    setLanguages((prev) => [...prev, e.target.value]);
  }

  function handleChangeLevel(e: React.ChangeEvent<HTMLInputElement>) {
    setLevel(e.target.value);
  }

  function handleChangeLinkedIn(e: React.ChangeEvent<HTMLInputElement>) {
    setLinkedIn(e.target.value);
  }

  // Console logging for debugging
  useEffect(() => {
    const stepTwoData = {
      level,
      languages,
      linkedIn,
    };
    console.log(stepTwoData);
  }, [level, languages, linkedIn]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Left Side */}
      <div className="min-h-screen pt-10 md:ml-4 md:border-r-2">
        <div className="flex flex-col justify-between">
          {/* Languages */}
          <div className="z-50 mt-4 ml-10 flex flex-col gap-2">
            <span className="font-opensans font-medium">
              What languages do you speak?
            </span>
            <ComboboxOnboarding
              className="max-w-sm"
              title="Expertises"
              data={fetchedLanguages.data || []}
              state={[languages, setLanguages]}
            />
          </div>
          {/* Level */}
          <div className="my-10 ml-10 flex min-w-max flex-col gap-2">
            <span className="font-opensans font-medium">
              What is your level of expertise?
            </span>

            <div className="max-w-sm">
              <DropdownSelect
                options={[
                  { name: "Entry Level (< 2 years)" },
                  { name: "Intermediate (< 4 years)" },
                  { name: "Senior (< 6 years)" },
                  { name: "Expert (< 10 years)" },
                  { name: "Master (> 10 years)" },
                ]}
                state={level}
                setState={setLevel}
                placeholder="Select your level"
              />
            </div>
          </div>
          {/* LinkedIn */}
          <div className="my-10 ml-10 flex min-w-max flex-col gap-2">
            <label className="font-opensans font-medium" htmlFor="linkedIn">
              LinkedIn URL
            </label>
            <input
              type="text"
              id="linkedIn"
              name="linkedIn"
              placeholder="Please paste your LinkedIn Profile URL here"
              className="h-10 max-w-sm  rounded-lg border border-gray-200 pl-2 shadow-md placeholder:text-sm placeholder:text-black focus:placeholder:opacity-0"
              value={linkedIn}
              onChange={handleChangeLinkedIn}
            />
          </div>
          {/* Navigation Actions */}
          <div className="mt-10 flex justify-between">
            <ButtonBack step={step} to="mentor">
              Back
            </ButtonBack>
            <ButtonNext step={step} to="mentor">
              Next
            </ButtonNext>
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
