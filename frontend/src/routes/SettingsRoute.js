import { useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import CenteredBox from "../components/CenteredBox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import SettingsSidebar from "../components/SettingsSidebar";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingBoundary from "../components/LoadingBoundary";
import UsersAPI from "../api/UsersAPI";

const SettingsRoute = ({ element }) => {
  const errorBoundaryRef = useRef();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(UsersAPI.QUERY_KEY, UsersAPI.getUser);

    errorBoundaryRef.current.reset();
  }, [queryClient]);

  return (
    <ErrorBoundary
      ref={errorBoundaryRef}
      fallback={({ error }) => (
        <CenteredBox>
          <ErrorIcon sx={{ fontSize: 100, mb: 3 }} />
          <Typography variant="h5" sx={{ mb: 10, userSelect: "none" }}>
            {error}
          </Typography>
        </CenteredBox>
      )}
    >
      <LoadingBoundary
        fallback={
          <CenteredBox>
            <CircularProgress />
          </CenteredBox>
        }
      >
        <Container
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          <Box sx={{ flex: 0.25, mb: { xs: 2, sm: 2, md: 0 } }}>
            <SettingsSidebar />
          </Box>
          <Box sx={{ flex: 0.75, px: { xs: 0, sm: 0, md: 3 } }}>{element}</Box>
        </Container>
      </LoadingBoundary>
    </ErrorBoundary>
  );
};

export default SettingsRoute;
