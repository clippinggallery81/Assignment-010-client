import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Review from "../components/Review";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import AddProperty from "../pages/AddProperty";
import AllProperties from "../pages/AllProperties";
import PropertyDetails from "../pages/PropertyDetails";
import MyProperties from "../pages/MyProperties";
import UpdateProperty from "../pages/UpdateProperty";
import MyRatings from "../pages/MyRatings";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: { title: "Home" },
      },
      {
        path: "/allProperties",
        element: <AllProperties />,
        handle: { title: "All Properties" },
      },
      {
        path: "/propertiesDetails/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
        handle: { title: "Property Details" },
      },
      {
        path: "/addProperties",
        element: (
          <PrivateRoute>
            <AddProperty />
          </PrivateRoute>
        ),
        handle: { title: "Add Property" },
      },
      {
        path: "/myProperties",
        element: (
          <PrivateRoute>
            <MyProperties />
          </PrivateRoute>
        ),
        handle: { title: "My Properties" },
      },
      {
        path: "/updateProperty/:id",
        element: (
          <PrivateRoute>
            <UpdateProperty />
          </PrivateRoute>
        ),
        handle: { title: "Update Property" },
      },
      {
        path: "/myRatings",
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
        handle: { title: "My Ratings" },
      },
      {
        path: "/review",
        element: <Review />,
        handle: { title: "Leave a Review" },
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        handle: { title: "Profile" },
      },
      {
        path: "/auth/login",
        element: <Login />,
        handle: { title: "Login" },
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
        handle: { title: "Sign Up" },
      },
    ],
  },
]);
