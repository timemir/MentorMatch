import { Mentee } from "../types/mentees";
import { UserOnboard } from "../types/users";
import BASE_URL from "./config";

// skip => pagination
async function getMenteeById(
  menteeId: number,
  skip = 0,
  limit = 25
): Promise<Mentee> {
  const response = await fetch(`${BASE_URL}/mentees/${menteeId}`, {
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

async function getMenteeByUserId(userId: number) {
  const response = await fetch(`${BASE_URL}/mentees/users/${userId}`, {
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
async function createMentee(user_id: number, user: UserOnboard) {
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

  const responseUpdateMentee = await fetch(`${BASE_URL}/mentees/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id }),
  });
  // Need to throw an error if the response is not ok, because fetch
  // will not throw an error if the response is not ok. really annoying.
  if (!responseUpdateMentee.ok) {
    throw new Error(
      `Error ${responseUpdateMentee.status}: ${responseUpdateMentee.statusText}`
    );
  }
  const dataMentee = await responseUpdateMentee.json();

  return { dataUser, dataMentee };
}

async function addExpertises(mentee_id: number, expertise_ids: number[]) {
  const response = await fetch(
    `${BASE_URL}/mentees/${mentee_id}/expertises`,

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

async function getExpertises(menteeId: number) {
  const response = await fetch(`${BASE_URL}/mentors/${menteeId}/expertises`, {
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

const mentees = {
  getMenteeById,
  getMenteeByUserId,
  createMentee,
  addExpertises,
  getExpertises,
};

export default mentees;
