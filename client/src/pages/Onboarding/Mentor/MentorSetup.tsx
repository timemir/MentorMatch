import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreviewProfile from "../../../components/Onboarding/PreviewProfile/PreviewProfile";
import { useMentorOnboardingStore } from "../../../store/onboardingStore";
import MentorStepFive from "./MentorStepFive";
import MentorStepFour from "./MentorStepFour";
import MentorStepOne from "./MentorStepOne";
import MentorStepSix from "./MentorStepSix";
import MentorStepThree from "./MentorStepThree";
import MentorStepTwo from "./MentorStepTwo";

export default function MentorSetup() {
  // stepId param from the route (URL)
  const { stepId } = useParams();

  const [step, setStep] = useState(Number(stepId));

  // Sync step state with route
  useEffect(() => {
    setStep(Number(stepId));
  }, [stepId]);

  const mentorStore = useMentorOnboardingStore();
  useEffect(() => {
    console.log("whole Store: ", mentorStore);
  }, [mentorStore]);

  return (
    <div className="md:grid md:grid-cols-2">
      <div>
        {step === 1 && <MentorStepOne step={step} />}
        {step === 2 && <MentorStepTwo step={step} />}
        {step === 3 && <MentorStepThree step={step} />}
        {step === 4 && <MentorStepFour step={step} />}
        {step === 5 && <MentorStepFive step={step} />}
        {step === 6 && <MentorStepSix step={step} />}
      </div>
      <PreviewProfile
        data={{
          id: 1,
          bio: mentorStore.bio,
          company: mentorStore.company,
          country: mentorStore.country,
          fullName: mentorStore.fullName,
          expertises: mentorStore.expertises,
          jobTitle: mentorStore.jobTitle,
          profilePicture: mentorStore.profilePicture,
        }}
      />
    </div>
  );
}
