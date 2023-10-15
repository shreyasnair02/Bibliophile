const URL = import.meta.env.VITE_SERVER_URL;

const postFn = (endpoint) => {
  return async (body) => {
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  };
};

export const postAuthLogin = postFn(URL + "users/auth/login");
export const postAuthSignup = postFn(URL + "users/auth/signup");
export const postAddToCart = postFn(URL + "users/cart");
export const postUploadBook = postFn(URL + "users/sellbook");
export const postOAuth = postFn(URL + "users/oauth");

// export const postOAuth = async ({ googleCredentials }) => {
//   const endpoint = URL + "users/oauth";
//   const response = await fetch(endpoint, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ googleCredentials }),
//   });
//   const data = await response.json();
//   return data;
// };

// export const postAuthLogin = async ({ email, password }) => {
//   const endpoint = URL + "users/auth/login";
//   const response = await fetch(endpoint, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });
//   const data = await response.json();
//   return data;
// };

// export const postAuthSignup = async ({ email, password, name }) => {
//   const endpoint = URL + "users/auth/signup";
//   const response = await fetch(endpoint, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password, name }),
//   });
//   const data = await response.json();
//   return data;
// };

// export const postAddToCart = async ({ book_id, action }) => {
//   const endpoint = URL + "users/cart";
//   const response = await fetch(endpoint, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ book_id, action }),
//   });
//   const data = await response.json();
//   return data;
// };

// export const postUploadBook = async (book) => {
//   const endpoint = URL + "users/sellbook";
//   const response = await fetch(endpoint, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(book),
//   });
//   const data = await response.json();
//   return data;
// };

// async ({ googleCredentials }) => {
//   const endpoint = URL + "users/oauth";
//   const response = await fetch(endpoint, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ googleCredentials }),
//   });
//   const data = await response.json();
//   return data;
// };
