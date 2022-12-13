import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from "../components/NavBar";
import CenteredBox from "../components/CenteredBox";
import CircularProgress from "@mui/material/CircularProgress";

const AuthorizedRoute = ({ element }) => {
  const [loggedIn, isLoading] = useAuth();

  if (isLoading) {
    return (
      <CenteredBox>
        <CircularProgress />
      </CenteredBox>
    );
  }

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
