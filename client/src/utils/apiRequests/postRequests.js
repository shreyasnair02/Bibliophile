const URL = import.meta.env.VITE_SERVER_URL;

export const postOAuth = async ({ googleCredentials }) => {
  const endpoint = URL + "users/oauth";
  const response = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ googleCredentials }),
  });
  const data = await response.json();
  return data;
};

export const postAuthLogin = async ({ email, password }) => {
  const endpoint = URL + "users/auth/login";
  const response = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
};

export const postAuthSignup = async ({ email, password, name }) => {
  const endpoint = URL + "users/auth/signup";
  const response = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
  const data = await response.json();
  return data;
};