/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from "react";
import ButtonBack from "../../../components/Onboarding/ButtonBack/ButtonBack";
import ButtonNext from "../../../components/Onboarding/ButtonNext/ButtonNext";
import { useMenteeOnboardingStore } from "../../../store/onboardingStore";

export default function MenteeStepThree({ step }: { step: number }) {
  const menteeOnboardingStore = useMenteeOnboardingStore();
  const [bio, setBio] = useMenteeOnboardingStore((state) => [
    state.bio,
    state.setBio,
  ]);

  function handleChangeBio(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBio(e.target.value);
  }

  // Console logging for debugging
  useEffect(() => {
    const stepThreeData = {
      bio,
    };
    console.log(stepThreeData);
  }, [bio]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Left Side */}
      <div className="min-h-screen pt-10 md:ml-4 md:border-r-2">
        {/* Expertises */}
        {/* Bio */}
        <div className="ml-10 mt-4 flex min-w-max flex-col gap-2">
          <label className="font-opensans font-medium" htmlFor="bio">
            What is your story?
          </label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself..."
            className="h-40 max-w-sm  rounded-lg border border-gray-200 pl-2 shadow-md placeholder:text-sm placeholder:text-gray-400 focus:placeholder:opacity-0"
            value={bio}
            onChange={handleChangeBio}
          />
        </div>
        {/* Example Bio */}
        <div className="ml-10 mt-4 flex min-w-max flex-col gap-2">
          <label className="font-opensans font-medium" htmlFor="bio">
            Example Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            disabled
            className="h-44 max-w-sm rounded-lg  border border-gray-200 pl-2 text-gray-400 shadow-md placeholder:text-sm placeholder:text-black focus:placeholder:opacity-0"
            value="Hi! 😀 My name is John Doe, and I am a software engineer at TechLabs. 
            
I joined this platform to find a mentor and accelerate my learning journey. I'm looking forward to connecting with mentors who can guide me and help me grow."
          />
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
      {/* Right Side */}
      {/* <div className="hidden md:block">
        <Profile />
      </div> */}
    </div>
  );
}
