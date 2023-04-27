import React from "react";
import ButtonNext from "../../../components/Onboarding/ButtonNext/ButtonNext";

export default function MentorStepSix({ step }: { step: number }) {
  return (
    <div>
      <h1>Step 6 Page</h1>
      <ButtonNext step={step} to="mentor">
        Next
      </ButtonNext>
    </div>
  );
}
