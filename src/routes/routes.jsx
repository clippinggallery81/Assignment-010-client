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
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import HelpCenter from "../pages/HelpCenter";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import ContactUs from "../pages/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        element: (
          <PrivateRoute>
            <Review />
          </PrivateRoute>
        ),
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
      {
        path: "/help",
        element: <HelpCenter />,
        handle: { title: "Help Center" },
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
        handle: { title: "Privacy Policy" },
      },
      {
        path: "/terms",
        element: <TermsOfService />,
        handle: { title: "Terms of Service" },
      },
      {
        path: "/contact",
        element: <ContactUs />,
        handle: { title: "Contact Us" },
      },
      {
        path: "*",
        element: <ErrorPage />,
        handle: { title: "404 - Not Found" },
      },
    ],
  },
]);
