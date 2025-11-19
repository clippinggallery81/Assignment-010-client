import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (user) return children;

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
