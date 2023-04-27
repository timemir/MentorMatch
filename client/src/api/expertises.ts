import { Expertise } from "../types/expertises";
import BASE_URL from "./config";

async function getExpertises(
  skip = 0,
  limit: null | number = null
): Promise<Expertise[]> {
  const queryParams = new URLSearchParams(String(skip));

  if (limit !== null) {
    queryParams.append("limit", String(limit));
  }

  const response = await fetch(
    `${BASE_URL}/expertises?${queryParams.toString()}`,
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

const expertises = {
  getExpertises,
};

export default expertises;
