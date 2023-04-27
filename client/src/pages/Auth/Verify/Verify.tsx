import React, { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Verify({
  email = "test@email.com",
}: {
  email?: string;
}) {
  // To think about: The email probably gets sent via the Router and not props?
  const [userEmail, setUserEmail] = useState(email);

  function handleChangeEmail() {
    // TODO: Handle change email process
  }
  function handleResentEmail() {
    // TODO: Handle resend email process
  }
  return (
    <div className="mt-16 flex flex-col items-center">
      <BiMailSend className="text-9xl text-mentorCTA" />
      <h1 className="mt-6 font-oswald text-4xl font-medium">
        Verify your email
      </h1>
      <p className="mt-2 max-w-lg text-center font-opensans font-light">
        To keep a trusted and safe community, we have sent you an email to
        <span className="font-serif">{` ${userEmail} `}</span>
        for verification, and you will only do this once.
      </p>
      <Link to="/user-type">Continue</Link>
      <div className="mt-8">
        <p className="font-opensans">
          Not the correct Email?{" "}
          <button
            className="font-opensans text-mentorCTA hover:text-mentorCTA900"
            type="button"
            onClick={handleChangeEmail}
          >
            Change Email address
          </button>
        </p>
        <p className="font-opensans">
          Did not recieve an Email?{" "}
          <button
            className="font-opensans text-mentorCTA hover:text-mentorCTA900"
            type="button"
            onClick={handleResentEmail}
          >
            Resent Email
          </button>
        </p>
      </div>
    </div>
  );
}

Verify.defaultProps = {
  email: "test@email.com",
};
