import BASE_URL from "./config";

async function postLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  // Need to throw an error if the response is not ok, because fetch
  // will not throw an error if the response is not ok. really annoying.
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

async function postRegister() {}

const auth = {
  postLogin,
  postRegister,
};

export default auth;
