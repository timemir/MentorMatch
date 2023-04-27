/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import ButtonBack from "../../../components/Onboarding/ButtonBack/ButtonBack";
import ButtonNext from "../../../components/Onboarding/ButtonNext/ButtonNext";
import { useMenteeOnboardingStore } from "../../../store/onboardingStore";

const options = [
  {
    name: "Find a job",
    value: "job",
  },
  {
    name: "Learn something new",
    value: "learn",
  },
  {
    name: "Grow as a person",
    value: "grow",
  },
  {
    name: "Transition careers",
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

export default function MenteeStepFour({ step }: { step: number }) {
  const [selected, setSelected] = useState<string[]>([]);
  const menteeOnboardingStore = useMenteeOnboardingStore();

  useEffect(() => {
    menteeOnboardingStore.setGoals(selected);
  }, [selected]);

  function handleSelection(value: string) {
    setSelected((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  }
  return (
    <div className="flex min-h-screen flex-col">
      {/* Left Side */}
      <div className="min-h-screen pt-10 md:ml-4 md:border-r-2">
        <div className="flex flex-col justify-between">
          {/* Expertises */}
          <div className="mt-4 ml-10 flex flex-col gap-2">
            <span className="font-opensans font-medium">
              What is your top goal right now? Please select one or many.
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
            <ButtonBack step={step} to="mentee">
              Back
            </ButtonBack>
            <ButtonNext step={step} to="mentee">
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
