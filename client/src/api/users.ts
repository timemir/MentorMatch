import BASE_URL from "./config";

async function getUser() {
  const response = await fetch(
    `${BASE_URL}/user`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

async function getUserById(id: number) {
  const response = await fetch(
    `${BASE_URL}/users/${id}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

const users = {
  getUser,
  getUserById,
};

export default users;
