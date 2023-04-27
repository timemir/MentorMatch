import Cookies from "js-cookie";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo-notext.svg";
import logoTree from "../../assets/logo/logoTree.png";
import useAuthStore from "../../store/authStore";

export default function NavigationBar() {
  // State for toggling the hamburger menu, for mobile
  const [toggleHamburger, setToggleHamburger] = useState(false);

  // Auth Store for checking if user is logged in and for getting user data
  const auth = useAuthStore();

  // Function for toggling the hamburger menu
  function handleHamburger() {
    setToggleHamburger(!toggleHamburger);
  }

  // Function for logging out
  function logOutHandler() {
    // Not really logging out, just removing the other related token
    Cookies.remove("csrf_access_token");
    auth.setIsLoggedIn(false);
  }

  return (
    <nav
      role="navigation"
      className="border-gray-200 bg-mentorPrimary px-2 py-2.5 sm:px-4 "
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={logoTree}
            className="mr-3 h-6 sm:h-14"
            alt="MentorMatch Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            MentorMatch
          </span>
        </Link>
        {/* Mobile Hamburger Button */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-mentorCTA focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleHamburger}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* ----- */}
        <div
          data-testid="navbar-default"
          className={`${
            toggleHamburger ? "" : "hidden"
          } w-full md:flex md:w-auto md:flex-row-reverse `}
          id="navbar-default"
        >
          {auth.isLoggedIn ? (
            <ul className=" mt-4 flex flex-col rounded-lg border border-gray-100 p-4 md:mt-0 md:ml-10  md:flex-row md:items-center md:space-x-8 md:border-0 md:p-0 md:text-sm md:font-medium lg:ml-36 xl:ml-72 ">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center rounded py-2 pl-3 pr-4 font-opensans text-white hover:bg-mentorCTA md:block md:border-0 md:p-0 md:transition md:hover:bg-transparent md:hover:text-mentorCTA"
                >
                  <img
                    className="hidden h-10 w-10 rounded-full object-cover md:block"
                    src={
                      auth.user.profile_picture ||
                      `https://api.multiavatar.com/${auth.user.first_name}.svg`
                    }
                    alt="Rounded avatar"
                  />
                  <span className="md:hidden">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/profile/${auth.user.id}`}
                  className="block rounded py-2 pl-3 pr-4 font-opensans text-white hover:bg-mentorCTA md:hidden md:border-2 md:border-transparent md:bg-transparent md:p-2 md:transition md:hover:bg-transparent  md:hover:opacity-80"
                >
                  <span className="md:hidden">Profile</span>
                  <AiOutlineLogout className="hidden text-2xl hover:text-mentorCTA md:block" />
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => logOutHandler()}
                  className="block rounded py-2 pl-3 pr-4 font-opensans text-white hover:bg-mentorCTA md:border-2 md:border-transparent md:bg-transparent md:p-2 md:transition md:hover:bg-transparent  md:hover:opacity-80"
                >
                  <span className="md:hidden">Log Out</span>
                  <AiOutlineLogout className="hidden text-2xl hover:text-mentorCTA md:block" />
                </Link>
              </li>
            </ul>
          ) : (
            <ul className=" mt-4 flex flex-col rounded-lg border border-gray-100 p-4 md:mt-0 md:ml-10  md:flex-row md:items-center md:space-x-8 md:border-0 md:p-0 md:text-sm md:font-medium lg:ml-36 xl:ml-72 ">
              <li>
                <Link
                  to="/login"
                  className="block rounded py-2 pl-3 pr-4 font-opensans text-white hover:bg-mentorCTA md:border-0 md:p-0 md:transition md:hover:bg-transparent md:hover:text-mentorCTA"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block rounded py-2 pl-3 pr-4 font-opensans text-white hover:bg-mentorCTA md:border-2 md:border-mentorCTA md:bg-mentorCTA md:p-2 md:transition md:hover:bg-mentorCTA  md:hover:opacity-80"
                >
                  Find mentors
                </Link>
              </li>
            </ul>
          )}
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 md:mt-0 md:flex-row  md:items-center md:space-x-8 md:border-0 md:p-0 md:text-sm md:font-medium ">
            <li>
              <Link
                to="/"
                className="block rounded py-2 pl-3 pr-4 font-opensans text-white hover:bg-mentorCTA md:border-0 md:p-0 md:transition md:hover:bg-transparent  md:hover:text-mentorCTA"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block rounded py-2 pl-3 pr-4 font-opensans text-white hover:bg-mentorCTA md:border-0 md:p-0 md:transition md:hover:bg-transparent  md:hover:text-mentorCTA"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="block rounded py-2 pl-3 pr-4 font-opensans text-white hover:bg-mentorCTA md:border-0 md:p-0 md:transition md:hover:bg-transparent md:hover:text-mentorCTA"
              >
                Discover
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
