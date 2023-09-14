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
        path: "/bookshelf/:bookId",
        element: <BookPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <LoginProvider> */}
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools /> */}
      {/* </LoginProvider> */}
    </QueryClientProvider>
  </React.StrictMode>
);
