/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import ButtonNext from "../../../components/Onboarding/ButtonNext/ButtonNext";
import DropdownSelect from "../../../components/UI/Listbox/DropdownSelect";
import { useMentorOnboardingStore } from "../../../store/onboardingStore";
import Profile from "../../Profile/Profile";

export default function MentorStepOne({ step }: { step: number }) {
  const [
    profilePicture,
    fullName,
    gender,
    country,
    setProfilePicture,
    setFullName,
    setGender,
    setCountry,
  ] = useMentorOnboardingStore((state) => [
    state.profilePicture,
    state.fullName,
    state.gender,
    state.country,
    state.setProfilePicture,
    state.setFullName,
    state.setGender,
    state.setCountry,
  ]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File>();
  const uploadPicture = useMutation({
    mutationFn: api.cloudinary.upload,
    onSuccess: (data) => {
      setProfilePicture(data);
    },
  });

  const countries = useQuery({
    queryKey: ["countries"],
    queryFn: api.countries.getCountries,
  });
  const adjustedCountries =
    countries.data?.map((countryobj) => ({
      name: countryobj.name,
    })) || [];

  function handleChangeProfilePicture(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadedImage(e.target.files?.[0]);
    setIsUploaded(true);
  }
  function handleUploadImage() {
    uploadPicture.mutate(uploadedImage as File);
  }

  function handleChangeFullName(e: React.ChangeEvent<HTMLInputElement>) {
    setFullName(e.target.value);
  }

  function handleChangeCountry(e: React.ChangeEvent<HTMLInputElement>) {
    setCountry(e.target.value);
  }

  // Console logging for debugging
  useEffect(() => {
    const stepOneData = {
      profilePicture,
      fullName,
      gender,
      country,
    };
    console.log(stepOneData);
  }, [profilePicture, fullName, gender, country]);

  return (
    <div className="flex min-h-screen flex-col ">
      {/* Left Side */}
      <div className="min-h-screen md:ml-4 md:border-r-2">
        <h1 className="mt-4 mb-8 text-center font-oswald text-4xl font-medium">
          Tell us your origin story
        </h1>
        {/* Profile Picture */}
        <div className="mt-4 ml-10 flex flex-col gap-2">
          <span className="font-opensans font-medium">
            Upload your profile photo
          </span>
          <div className="flex items-center gap-1">
            <Avatar rounded size="lg" img={profilePicture || ""} />
            {!isUploaded ? (
              <label htmlFor="profilePicture">
                {/* TODO: Get good looking file upload button */}

                <input
                  type="file"
                  id="profilePicture"
                  className={`${
                    isUploaded ? "hidden" : "block"
                  } text-transparent file:mr-4 file:rounded-full file:border-0 file:bg-mentorCTA50 file:py-2 file:px-4 file:font-opensans file:text-sm file:font-semibold file:text-mentorCTA placeholder:hidden hover:file:bg-mentorCTA100`}
                  name="profilePicture"
                  onChange={handleChangeProfilePicture}
                />
              </label>
            ) : !uploadPicture.isLoading ? (
              <button
                className={`${
                  uploadPicture.isSuccess ? "hidden" : "block"
                } ml-2 rounded-lg bg-mentorCTA p-2 text-white hover:bg-mentorCTA500`}
                type="button"
                onClick={handleUploadImage}
              >
                Upload Image
              </button>
            ) : (
              <p>Uploading...</p>
            )}
            {uploadPicture.isSuccess && (
              <p className="font-opensans font-medium text-green-500">
                Image uploaded
              </p>
            )}
            {uploadPicture.isError && (
              <p className="font-opensans font-medium text-red-700">
                Image upload failed
              </p>
            )}
            {!isUploaded && (
              <div className="flex -translate-x-40 flex-col">
                <p className=" font-opensans font-medium text-mentorCTA">
                  Select a file
                </p>
                <p className="font-opensans text-sm font-light text-gray-500">
                  Make sure the file is below 2mb
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Full Name */}
        <div className="ml-10 mt-4 flex min-w-max flex-col gap-2">
          <label className="font-opensans font-medium" htmlFor="fullName">
            Your full name{" "}
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="First and last name"
            className="h-10 max-w-sm  rounded-lg border border-gray-200 pl-2 shadow-md placeholder:text-sm placeholder:text-black focus:placeholder:opacity-0"
            value={fullName}
            onChange={handleChangeFullName}
          />
        </div>
        {/* Gender */}
        <div className="my-10 ml-10 flex min-w-max flex-col gap-2">
          <span className="font-opensans font-medium">
            What gender do you identify as?
          </span>

          <div className="max-w-sm">
            <DropdownSelect
              options={[
                { name: "male" },
                { name: "female" },
                { name: "divers" },
              ]}
              state={gender}
              setState={setGender}
              placeholder="Select a gender"
            />
          </div>
        </div>
        {/* Country */}
        <div className="my-14 ml-10 flex min-w-max flex-col gap-2">
          <span className="font-opensans font-medium">
            Which country do you live in?
          </span>
          <div className="max-w-sm">
            <DropdownSelect
              options={adjustedCountries}
              state={country}
              setState={setCountry}
              placeholder="Select a country"
            />
          </div>
        </div>
        {/* Navigation Actions */}
        <div className="mt-4 flex justify-end">
          <ButtonNext step={step} to="mentor">
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
