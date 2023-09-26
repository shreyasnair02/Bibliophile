import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAuth,
  getBooks,
  getBook,
  getBooksSearch,
  getLogout,
} from "../utils/apiRequests/getRequests";
import {
  postAuthLogin,
  postOAuth,
  postAuthSignup,
} from "../utils/apiRequests/postRequests";
import { useQueryClient } from "@tanstack/react-query";

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

export const useOAuth = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postOAuth,
  });
};

export const useAuthLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAuthLogin,
  });
};

export const useAuthSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAuthSignup,
  });
};

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["user", "checkAuth"],
    queryFn: getAuth,
  });
};

export const useLogout = (endpoint) => {
  const obj = useQuery({
    queryKey: ["user", "logout"],
    queryFn: getLogout,
    enabled: false,
  });

  const handleLogout = async (setLoginData) => {
    try {
      await obj.refetch();
      setLoginData(false, null);
    } catch (error) {}
  };
  return { handleLogout, isLoggingout: obj.isLoading };
};

export const useGetBook = (endpoint) => {
  const [id] = endpoint;
  return useQuery({
    queryKey: ["books", id],
    queryFn: getBook,
  });
};
