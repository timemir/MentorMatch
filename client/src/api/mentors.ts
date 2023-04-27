import { Expertise } from "../types/expertises";
import { MentorAndUser } from "../types/mentors";
import { SearchQuery } from "../types/searchQuery";
import { UserOnboard } from "../types/users";
import BASE_URL from "./config";

// skip => pagination
async function getMentors(
  searchQuery: SearchQuery = {},
  skip = 0,
  limit = 25
): Promise<MentorAndUser[]> {
  // Convert the searchQuery object to a query string
  const searchParams = new URLSearchParams(
    Object.entries(searchQuery).reduce((params, [key, value]) => {
      if (value !== undefined) {
        return { ...params, [key]: String(value) };
      }
      return params;
    }, {} as Record<string, string>)
  ).toString();

  // Include the searchParams in the request URL
  const response = await fetch(
    `${BASE_URL}/mentors_and_users?skip=${skip}&limit=${limit}&${searchParams}`,
    {
      method: "GET",
    }
  );
  // Need to throw an error if the response is not ok, because fetch
  // will not throw an error if the response is not ok. really annoying.
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

async function getMentorByUserId(userId: number) {
  const response = await fetch(`${BASE_URL}/mentors/users/${userId}`, {
    method: "GET",
  });
  // Need to throw an error if the response is not ok, because fetch
  // will not throw an error if the response is not ok. really annoying.
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

async function createMentor(user_id: number, user: UserOnboard) {
  const responseUpdateUser = await fetch(
    `${BASE_URL}/users/${user_id}/onboard`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        is_mentor: false,
      }),
    }
  );
  // Need to throw an error if the response is not ok, because fetch
  // will not throw an error if the response is not ok. really annoying.
  if (!responseUpdateUser.ok) {
    throw new Error(
      `Error ${responseUpdateUser.status}: ${responseUpdateUser.statusText}`
    );
  }
  const dataUser = await responseUpdateUser.json();

  const responseUpdateMentor = await fetch(`${BASE_URL}/mentors/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id }),
  });
  // Need to throw an error if the response is not ok, because fetch
  // will not throw an error if the response is not ok. really annoying.
  if (!responseUpdateMentor.ok) {
    throw new Error(
      `Error ${responseUpdateMentor.status}: ${responseUpdateMentor.statusText}`
    );
  }
  const dataMentor = await responseUpdateMentor.json();

  return { dataUser, dataMentor };
}

async function addExpertises(mentor_id: number, expertise_ids: number[]) {
  const response = await fetch(
    `${BASE_URL}/mentors/${mentor_id}/expertises`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        expertise_ids,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function getExpertises(mentorId: number) {
  const response = await fetch(`${BASE_URL}/mentors/${mentorId}/expertises`, {
    method: "GET",
  });
  // Need to throw an error if the response is not ok, because fetch
  // will not throw an error if the response is not ok. really annoying.
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

const mentors = {
  getMentors,
  getMentorByUserId,
  createMentor,
  addExpertises,
  getExpertises,
};

export default mentors;
