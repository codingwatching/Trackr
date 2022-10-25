import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from "../components/NavBar";

const AuthorizedRoute = ({ element }) => {
  const loggedIn = useAuth();
  if (loggedIn) {
    return (
      <>
        <NavBar />
        {element}
      </>
    );
  }

  return <Navigate to="/login" />;
};

export default AuthorizedRoute;
