import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import { useFields } from "../hooks/useFields";
import { useVisualizations } from "../hooks/useVisualizations";
import { createContext } from "react";
import ProjectNavBar from "../components/ProjectNavBar";
import CenteredBox from "../components/CenteredBox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

export const ProjectRouteContext = createContext();

const ProjectRoute = ({ element }) => {
  const { projectId } = useParams();
  const [project, setProject, loadingProject, errorProject] =
    useProject(projectId);
  const [fields, setFields, loadingFields, errorFields] = useFields(projectId);
  const [
    visualizations,
    setVisualizations,
    loadingVisualizations,
    errorVisualizations,
  ] = useVisualizations(projectId);

  if (errorProject) {
    return (
      <CenteredBox>
        <ErrorIcon sx={{ fontSize: 100, mb: 3 }} />
        <Typography
          variant="h5"
          sx={{ mb: 10, userSelect: "none", textAlign: "center" }}
        >
          {errorProject}
        </Typography>
      </CenteredBox>
    );
  }

  return (
    <>
      <ProjectNavBar loading={loadingProject} project={project} />
      {loadingProject || loadingFields || loadingVisualizations ? (
        <CenteredBox>
          <CircularProgress />
        </CenteredBox>
      ) : errorFields || errorVisualizations ? (
        <CenteredBox sx={{ pt: 5, pb: 8, px: 1 }}>
          <ErrorIcon sx={{ fontSize: 100, mb: 3 }} />
          <Typography
            variant="h5"
            sx={{
              userSelect: "none",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Box>{errorFields}</Box>
            <Box>{errorVisualizations}</Box>
          </Typography>
        </CenteredBox>
      ) : (
        <ProjectRouteContext.Provider
          value={{
            project,
            setProject,
            fields,
            setFields,
            visualizations,
            setVisualizations,
          }}
        >
          {element}
        </ProjectRouteContext.Provider>
      )}
    </>
  );
};

export default ProjectRoute;
