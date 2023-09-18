import { useQuery } from "@tanstack/react-query";
import { getBooks, getBooksSearch } from "../utils/apiRequests/getRequests";

export const useGetBooks = (endpoint, param) => {
  const { selectedGenres, sort } = endpoint;
  return useQuery({
    queryKey: ["books", selectedGenres, sort],
    queryFn: getBooks,
  });
};

export const useSearchBooks = (endpoint, param) => {
  const [search] = endpoint;
  console.log({ search });
  return useQuery({
    queryKey: ["books/search", search],
    queryFn: getBooksSearch,
    enabled: !!search,
  });
};
