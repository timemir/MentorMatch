import { Countries } from "../types/countries";
import BASE_URL from "./config";

async function getCountries(): Promise<Countries[]> {
  const response = await fetch(`${BASE_URL}/countries?limit=0`, {
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

async function getCountryCode(country_name: string): Promise<Countries> {
  const response = await fetch(`${BASE_URL}/countries/name/${country_name}`, {
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

const countries = {
  getCountries,
  getCountryCode,
};

export default countries;
