import { useParams } from "react-router-dom";
import { createContext } from "react";
import ProjectNavBar from "../components/ProjectNavBar";
import CenteredBox from "../components/CenteredBox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingBoundary from "../components/LoadingBoundary";

export const ProjectRouteContext = createContext();

const ProjectRoute = ({ element }) => {
  const { projectId } = useParams();

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
      <ProjectNavBar />

      {/* <LoadingBoundary
        fallback={
          <CenteredBox>
            <CircularProgress />
          </CenteredBox>
        }
      >
        {element}
      </LoadingBoundary> */}
    </ErrorBoundary>
  );
};

export default ProjectRoute;
