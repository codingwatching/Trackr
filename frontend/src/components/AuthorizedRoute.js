import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthorizedRoute = ({ element }) => {
  const loggedIn = useAuth();
  if (loggedIn) {
    return element;
  }

  return <Navigate to="/login" />;
};

export default AuthorizedRoute;
