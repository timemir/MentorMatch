// This is a function that retrieves a dummy user from the jsonplaceholder API.
// The function returns a user object, which contains the user's data.

export default async function getTestUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}
