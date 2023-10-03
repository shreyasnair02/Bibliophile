import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root.jsx";
import Error from "./utils/Error.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./routes/home/HomePage";
import Bookshelf from "./routes/Bookshelf";
import BookPage from "./routes/BookPage";
import Auth from "./routes/login/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginProvider } from "./Context/LoginProvider";
import { CartProvider } from "./Context/CartProvider";
import CartPage from "./routes/CartPage";
import SellBook from "./routes/SellBook";
import Profile from "./routes/Profile";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "bookshelf",
        element: <Bookshelf />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "sellbook",
        element: <SellBook />,
      },
      {
        path: "bookshelf/:bookId",
        element: <BookPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <LoginProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </CartProvider>
        </LoginProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
