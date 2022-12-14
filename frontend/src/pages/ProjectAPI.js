import { useProject } from "../hooks/useProject";
import { Suspense, useContext, lazy } from "react";
import { ProjectRouteContext } from "../routes/ProjectRoute";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CenteredBox from "../components/CenteredBox";
import Divider from "@mui/material/Divider";
import ResetAPIKeyButton from "../components/ResetAPIKeyButton";

const OpenAPI = lazy(() => import("../components/openapi/OpenAPI"));

const ProjectAPI = () => {
  const projectId = useContext(ProjectRouteContext);
  const project = useProject(projectId);

  return (
    <Container sx={{ mt: 3, pb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 0.5,
        }}
      >
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          API
        </Typography>
      </Box>
      <Typography variant="h7" sx={{ pb: 10, color: "#707070" }}>
        Below is your API key which you can use to access your project's data.
        Keep this key safe in a secret place.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            maxWidth: "fit-content",
            p: 2,
            mt: 1.5,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {project.apiKey}
        </Box>

        <Typography variant="caption" sx={{ mt: 1, mb: 2, color: "gray" }}>
          If you feel your key has been compromised, click <b>Reset API Key</b>{" "}
          to reset your API key.
        </Typography>
      </Box>
      <ResetAPIKeyButton variant="outlined" />

      <Divider sx={{ mb: 3, mt: 4 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mt: 3,
          mb: 0.5,
        }}
      >
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Endpoints
        </Typography>
      </Box>

      <Typography variant="h7" sx={{ color: "#707070" }}>
        The API provides you with a set of endpoints that allow you to read and
        write data to a field in a project of your choice. The API can be called
        just with any HTTP Client, like Postman, Insomnia, or even right here in
        the browser.
      </Typography>
      <Box sx={{ my: 3 }} />

      <Suspense
        fallback={
          <CenteredBox>
            <CircularProgress />
          </CenteredBox>
        }
      >
        <OpenAPI />
      </Suspense>
    </Container>
  );
};

export default ProjectAPI;
