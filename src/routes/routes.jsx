import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/properties",
        element: <h1>Properties Page</h1>,
      },
      {
        path: "/buyProperties",
        element: <h1>Buy Properties Page</h1>,
      },
      {
        path: "/rentProperties",
        element: <h1>Rent Properties Page</h1>,
      },
    ],
  },
]);
