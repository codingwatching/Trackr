import { cloneElement } from "react";
import { useUser } from "../contexts/UserContext";
import CenteredBox from "./CenteredBox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

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

  return cloneElement(element, { user, setUser });
};

export default UserRoute;
