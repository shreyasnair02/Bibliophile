import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAuth,
  getBooks,
  getBook,
  getBooksSearch,
  getLogout,
  getUnlistBook,
  getPlaceOrder,
} from "../utils/apiRequests/getRequests";
import {
  postAuthLogin,
  postOAuth,
  postAuthSignup,
  postAddToCart,
  postUploadBook,
} from "../utils/apiRequests/postRequests";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Logout failed");
    }
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

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAddToCart,
  });
};

export const useUploadBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUploadBook,
  });
};

export const useUnlistBook = (book_id) => {
  const queryClient = useQueryClient();
  const obj = useQuery({
    queryKey: ["users", "listings", book_id],
    queryFn: getUnlistBook,
    enabled: false,
  });

  const handleUnlistBook = async () => {
    try {
      const response = await obj.refetch();
      if (response.data.message === "success") {
        toast.success("Book unlisted");
      }
      return "success";
    } catch (error) {
      console.log(error);
      toast.error("Book unlist failed");
    }
  };
  return { handleUnlistBook, isUnlisting: obj.isLoading };
};

export const usePlaceOrder = () => {
  const obj = useQuery({
    queryKey: ["user", "placeorder"],
    queryFn: getPlaceOrder,
    enabled: false,
  });

  const handlePlaceOrder = async (setLoginData) => {
    try {
      await obj.refetch();
      toast.success("Order has been placed!");
    } catch (error) {
      toast.error("Could not place order!");
    }
  };
  return { handlePlaceOrder, isPlacingOrder: obj.isLoading };
};
