import { createContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import ProjectNavBar from "../components/ProjectNavBar";
import CenteredBox from "../components/CenteredBox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingBoundary from "../components/LoadingBoundary";
import ProjectsAPI from "../api/ProjectsAPI";
import FieldsAPI from "../api/FieldsAPI";
import VisualizationsAPI from "../api/VisualizationsAPI";

export const ProjectRouteContext = createContext();

const ProjectRoute = ({ element }) => {
  const params = useParams();
  const projectId = parseInt(params.projectId);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery([ProjectsAPI.QUERY_KEY, projectId], () =>
      ProjectsAPI.getProject(projectId)
    );
    queryClient.prefetchQuery([FieldsAPI.QUERY_KEY, projectId], () =>
      FieldsAPI.getFields(projectId)
    );
    queryClient.prefetchQuery([VisualizationsAPI.QUERY_KEY, projectId], () =>
      VisualizationsAPI.getVisualizations(projectId)
    );
  }, [queryClient, projectId]);

  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <CenteredBox>
          <ErrorIcon sx={{ fontSize: 100, mb: 3 }} />
          <Typography
            variant="h5"
            sx={{ mb: 10, userSelect: "none", textAlign: "center" }}
          >
            {error}
          </Typography>
        </CenteredBox>
      )}
    >
      <ProjectRouteContext.Provider value={parseInt(projectId)}>
        <ProjectNavBar />

        <LoadingBoundary
          fallback={
            <CenteredBox>
              <CircularProgress />
            </CenteredBox>
          }
        >
          {element}
        </LoadingBoundary>
      </ProjectRouteContext.Provider>
    </ErrorBoundary>
  );
};

export default ProjectRoute;
