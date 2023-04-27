/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { BsLinkedin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import useAuthStore from "../../../store/authStore";

export default function LoginForm() {
  // React state to store the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Auth store to store the user and isLoggedIn state
  const auth = useAuthStore();

  // React Router navigate function to redirect to dashboard
  const navigate = useNavigate();

  // React Query mutation to send login data to the server
  const loginMutation = useMutation({
    mutationFn: api.auth.postLogin,
    onSuccess: async () => {
      try {
        const loggedInUser = await api.users.getUser();
        auth.setUser(loggedInUser);
        auth.setIsLoggedIn(true);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error getting user data:", error);
        auth.setIsLoggedIn(false);
      }
    },
  });

  // Handle the email input changes
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  // Handle the password input changes
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  // Handle the form submit event
  function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault(); // Prevents page refresh
    const loginData = {
      email,
      password,
    };
    // Call the mutation function to send the login data to the server
    loginMutation.mutate(loginData);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <form className=" flex w-96 flex-col items-center rounded-3xl bg-gray-200 p-20 shadow-lg">
        {" "}
        <h1 className="mb-14 font-oswald text-5xl">Sign in</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-opensans font-medium">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="rounded-md border-2 border-gray-300 p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-opensans font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="rounded-md border-2 border-gray-300 p-2"
          />
        </div>
        {/* When the response from backend is loading, show a loading message */}
        {/* When the response from backend finished loading and it is an error, display error message */}
        {/* TODO: Change to a loading spinner */}
        {loginMutation.isLoading ? (
          <div>Loading...</div>
        ) : (
          loginMutation.isError && (
            <div>{(loginMutation.error as Error).message}</div>
          )
        )}
        {loginMutation.isSuccess ? <div>Success!</div> : null}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 min-w-full rounded-lg bg-mentorCTA p-2 font-opensans text-white hover:bg-mentorCTA800"
        >
          Sign in
        </button>
        <div>
          <hr className="my-8 h-px border-2 bg-gray-200" />{" "}
          <button
            type="button"
            className="rounded-lg border-2 border-gray-300 p-2 px-6 "
          >
            <BsLinkedin className="text-2xl text-gray-500" />{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
