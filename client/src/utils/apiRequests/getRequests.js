const URL = import.meta.env.VITE_SERVER_URL;

const getFn = (cb) => {
  return async ({ queryKey }) => {
    const response = await fetch(cb(queryKey), {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  };
};

export const getUnlistBook = getFn((queryKey) => {
  const [base, action, id] = queryKey;
  const endpoint = URL + base + "/" + action + "?id=" + id;
  return endpoint;
});

export const getBook = getFn((queryKey) => {
  const [base, id] = queryKey;
  const endpoint = URL + base + "/" + id;
  return endpoint;
});

export const getLogout = getFn((queryKey) => {
  const endpoint = `users/logout`;
  return URL + `${endpoint}`;
});

export const getAuth = getFn((queryKey) => {
  const endpoint = `users/checkauth`;
  return URL + `${endpoint}`;
});

export const getBooks = getFn((queryKey) => {
  const [base, genres, sort] = queryKey;
  const append =
    genres.length > 0
      ? "?genre=" + encodeURIComponent(genres.join(",")) + "&"
      : "?";
  const endpoint = URL + base + `${append}sort=${sort}`;
  return endpoint;
});

export const getBooksSearch = getFn((queryKey) => {
  const [base, search] = queryKey;
  return URL + base + "?q=" + search;
});

export const getPlaceOrder = getFn((queryKey) => {
  const endpoint = `users/placeorder`;
  return URL + `${endpoint}`;
});
// export const getBooks = async ({ queryKey }) => {
//   const [base, genres, sort] = queryKey;

//   const append =
//     genres.length > 0
//       ? "?genre=" + encodeURIComponent(genres.join(",")) + "&"
//       : "?";
//   const endpoint = URL + base + `${append}sort=${sort}`;
//   const response = await fetch(endpoint, {
//     method: "GET",
//     credentials: "include",
//   });
//   const data = await response.json();
//   return data;
// };

// export const getBooksSearch = async ({ queryKey }) => {
//   const [base, search] = queryKey;
//   const endpoint = URL + base + "?q=" + search;
//   const response = await fetch(endpoint, {
//     method: "GET",
//     credentials: "include",
//   });
//   const data = await response.json();
//   return data;
// };

// export const getAuth = async () => {
//   const endpoint = `users/checkauth`;
//   const response = await fetch(URL + `${endpoint}`, {
//     method: "GET",
//     credentials: "include",
//   });
//   const data = await response.json();
//   return data;
// };

// export const getLogout = async ({ queryKey }) => {
//   const endpoint = `users/logout`;
//   const response = await fetch(URL + `${endpoint}`, { credentials: "include" });
//   const data = await response.json();
//   return data;
// };

// export const getBook = async ({ queryKey }) => {
//   const [base, id] = queryKey;
//   const endpoint = URL + base + "/" + id;
//   const response = await fetch(endpoint, {
//     method: "GET",
//     credentials: "include",
//   });
//   const data = await response.json();
//   return data;
// };

// export const getUnlistBook = async ({ queryKey }) => {
//   const [base, action, id] = queryKey;
//   const endpoint = URL + base + "/" + action + "?id=" + id;
//   console.log(endpoint);
//   const response = await fetch(endpoint, {
//     method: "GET",
//     credentials: "include",
//   });
//   const data = await response.json();
//   return data;
// };
