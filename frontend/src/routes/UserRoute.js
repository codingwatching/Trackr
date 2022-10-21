import { cloneElement, createContext } from "react";
import { useUser } from "../hooks/useUser";
import CenteredBox from "../components/CenteredBox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

export const UserRouteContext = createContext();

const UserRoute = ({ element }) => {
  const [user, setUser, loading, error] = useUser();

  if (error) {
    return (
      <CenteredBox>
        <ErrorIcon sx={{ fontSize: 100, mb: 3 }} />
        <Typography variant="h5" sx={{ mb: 10, userSelect: "none" }}>
          {error}
        </Typography>
      </CenteredBox>
    );
  }

  if (loading) {
    return (
      <CenteredBox>
        <CircularProgress />
      </CenteredBox>
    );
  }

  return (
    <UserRouteContext.Provider value={{ user, setUser }}>
      {element}
    </UserRouteContext.Provider>
  );
};

export default UserRoute;
