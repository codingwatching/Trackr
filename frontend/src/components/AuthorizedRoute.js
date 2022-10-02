import React, { createContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthorizedRoute = ({ element }) => {
  const [isLoggedIn] = useAuth();
  if (isLoggedIn) {
    return element;
  }

  return <Navigate to="/login" />;
};

export default AuthorizedRoute;
