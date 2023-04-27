import React, { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (email !== confirmEmail) {
      setError("E-Mails do not match");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleConfirmEmailChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmPassword(event.target.value);
  }
  function handleAgeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAge(event.target.value);
  }
  return (
    <div className="container mx-auto mt-8 max-w-xs">
      <h1 className="text-center text-2xl font-bold">Create an account</h1>
      <form className="mt-8">
        <div className="mb-2">
          <label htmlFor="email" className="mb-2 block font-bold">
            Your E-Mail
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full rounded-md border-2 border-gray-300 p-2"
            />
          </label>
        </div>

        <div className="mb-2">
          <label htmlFor="confirmEmail" className="mb-2 block font-bold">
            Confirm E-Mail
            <input
              type="email"
              name="confirmEmail"
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
              className="w-full rounded-md border-2 border-gray-300 p-2"
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="mb-2 block font-bold">
            Your Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full rounded-md border-2 border-gray-300 p-2"
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="confirmPassword" className="mb-2 block font-bold">
            Confirm Password
            <input
              type="password"
              name="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full rounded-md border-2 border-gray-300 p-2"
            />
          </label>
        </div>

        <div className="mb-2">
          <label htmlFor="age" className="mb-2 block font-bold">
            Your Age
            <input
              type="number"
              name="age"
              value={age}
              onChange={handleAgeChange}
              className="w-full rounded-md border-2 border-gray-300 p-2"
              min={18}
              max={100}
            />
          </label>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 min-w-full rounded-lg bg-mentorCTA p-2 font-opensans text-white hover:bg-mentorCTA800"
        >
          Sign up
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
}
