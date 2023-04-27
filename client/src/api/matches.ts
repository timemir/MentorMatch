import Cookies from "js-cookie";
import BASE_URL from "./config";

async function postMatchRequest(mentor_id: number) {
  const response = await fetch(`${BASE_URL}/matches/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": Cookies.get("csrf_access_token"),
    },
    body: JSON.stringify({ mentor_id }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

async function getMatches() {
  const response = await fetch(`${BASE_URL}/matches`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

async function getMatchesSuggestions() {
  const response = await fetch(`${BASE_URL}/matches/find`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

async function patchMatchAccept(matchId: number) {
  const response = await fetch(`${BASE_URL}/matches/${matchId}/accept`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

async function patchMatchReject(matchId: number) {
  const response = await fetch(`${BASE_URL}/matches/${matchId}/reject`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

async function getMatchById(match_id: number) {
  const response = await fetch(`${BASE_URL}/matches/${match_id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

const matches = {
  postMatchRequest,
  getMatches,
  getMatchesSuggestions,
  getMatchById,
  patchMatchAccept,
  patchMatchReject,
};

export default matches;
