/* eslint-disable jsx-a11y/label-has-associated-control */
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import api from "../../../api/api";
import ButtonBack from "../../../components/Onboarding/ButtonBack/ButtonBack";
import ButtonNext from "../../../components/Onboarding/ButtonNext/ButtonNext";
import ComboboxOnboarding from "../../../components/Onboarding/Combobox/ComboboxOnboarding";
import { useMentorOnboardingStore } from "../../../store/onboardingStore";

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

export default function MentorStepTwo({ step }: { step: number }) {
  const [
    expertises,
    company,
    jobTitle,
    setExpertises,
    setCompany,
    setJobTitle,
  ] = useMentorOnboardingStore((state) => [
    state.expertises,
    state.company,
    state.jobTitle,
    state.setExpertises,
    state.setCompany,
    state.setJobTitle,
  ]);

  const fetchedExpertises = useQuery({
    queryKey: ["expertises"],
    queryFn: () => api.expertises.getExpertises(),
  });

  function handleChangeExpertises(e: React.ChangeEvent<HTMLInputElement>) {
    setExpertises((prev) => [...prev, e.target.value]);
  }

  function handleChangeCompany(e: React.ChangeEvent<HTMLInputElement>) {
    setCompany(e.target.value);
  }

  function handleChangeJobTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setJobTitle(e.target.value);
  }

  // Console logging for debugging
  useEffect(() => {
    const stepTwoData = {
      expertises,
      company,
      jobTitle,
    };
    console.log(stepTwoData);
  }, [expertises, company, jobTitle]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Left Side */}
      <div className="min-h-screen pt-10 md:ml-4 md:border-r-2">
        <div className="flex flex-col justify-between">
          {/* Expertises */}
          <div className="mt-4 ml-10 flex flex-col gap-2">
            <span className="font-opensans font-medium">
              Which expertises would you like to mentor?
            </span>
            <ComboboxOnboarding
              className="max-w-sm"
              title="Expertise"
              data={fetchedExpertises.data || expertiseData}
              state={[expertises, setExpertises]}
            />
          </div>
          {/* Company */}
          <div className="ml-10 mt-4 flex min-w-max flex-col gap-2">
            <label className="font-opensans font-medium" htmlFor="company">
              Current Company or Occupation
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Company / Occupation"
              className="h-10 max-w-sm  rounded-lg border border-gray-200 pl-2 shadow-md placeholder:text-sm placeholder:text-black focus:placeholder:opacity-0"
              value={company}
              onChange={handleChangeCompany}
            />
          </div>
          {/* Job Title */}
          <div className="my-10 ml-10 flex min-w-max flex-col gap-2">
            <label className="font-opensans font-medium" htmlFor="jobTitle">
              Current Title or Position
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              placeholder="Job Title / Position"
              className="h-10 max-w-sm  rounded-lg border border-gray-200 pl-2 shadow-md placeholder:text-sm placeholder:text-black focus:placeholder:opacity-0"
              value={jobTitle}
              onChange={handleChangeJobTitle}
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
