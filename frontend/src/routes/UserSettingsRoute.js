import { createContext } from "react";
import { useUser } from "../hooks/useUser";
import CenteredBox from "../components/CenteredBox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import UserSettingsSidebar from "../components/UserSettingsSidebar";

export const UserSettingsRouteContext = createContext();

const UserSettingsRoute = ({ element }) => {
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
    <Container
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
      }}
    >
      <Box sx={{ flex: 0.25, mb: { xs: 2, sm: 2, md: 0 } }}>
        <UserSettingsSidebar />
      </Box>
      <Box sx={{ flex: 0.75, px: { xs: 0, sm: 0, md: 3 } }}>
        <UserSettingsRouteContext.Provider value={{ user, setUser }}>
          {element}
        </UserSettingsRouteContext.Provider>
      </Box>
    </Container>
  );
};

export default UserSettingsRoute;
