import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreviewProfile from "../../../components/Onboarding/PreviewProfile/PreviewProfile";
import { useMenteeOnboardingStore } from "../../../store/onboardingStore";
import MenteeStepFive from "./MenteeStepFive";
import MenteeStepFour from "./MenteeStepFour";
import MenteeStepOne from "./MenteeStepOne";
import MenteeStepThree from "./MenteeStepThree";
import MenteeStepTwo from "./MenteeStepTwo";

export default function Mentee() {
  // stepId param from the route (URL)
  const { stepId } = useParams();

  const [step, setStep] = useState(Number(stepId));

  // Sync step state with route
  useEffect(() => {
    setStep(Number(stepId));
  }, [stepId]);

  const menteeStore = useMenteeOnboardingStore((state) => state);
  useEffect(() => {
    console.log("whole Store: ", menteeStore);
  }, [menteeStore]);

  return (
    <div className="md:grid md:grid-cols-2">
      {/* <div className="border-2 border-red-200 bg-gray-400">
        <span>DEBUG WINDOW</span>
        <h2>Step in Route: {stepId}</h2>
        <h2>Step in State: {step}</h2>
      </div> */}
      <div>
        {step === 1 && <MenteeStepOne step={step} />}
        {step === 2 && <MenteeStepTwo step={step} />}
        {step === 3 && <MenteeStepThree step={step} />}
        {step === 4 && <MenteeStepFour step={step} />}
        {step === 5 && <MenteeStepFive step={step} />}
      </div>
      <PreviewProfile
        data={{
          id: 1,
          bio: menteeStore.bio,
          company: menteeStore.company,
          country: menteeStore.country,
          fullName: menteeStore.fullName,
          expertises: menteeStore.expertises,
          jobTitle: menteeStore.jobTitle,
          profilePicture: menteeStore.profilePicture,
        }}
      />
    </div>
  );
}
