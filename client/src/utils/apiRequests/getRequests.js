const URL = import.meta.env.VITE_SERVER_URL;

export const getBooks = async ({ queryKey }) => {
  const [base, genres, sort] = queryKey;

  const append =
    genres.length > 0
      ? "?genre=" + encodeURIComponent(genres.join(",")) + "&"
      : "?";
  const endpoint = URL + base + `${append}sort=${sort}`;
  console.log(endpoint);
  const response = await fetch(endpoint, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const getBooksSearch = async ({ queryKey }) => {
  const [base, search] = queryKey;
  const endpoint = URL + base + "?q=" + search;
  const response = await fetch(endpoint, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};
