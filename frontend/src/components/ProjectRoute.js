import { useParams } from "react-router-dom";
import { useProject } from "../contexts/ProjectContext";
import { cloneElement } from "react";
import ProjectNavBar from "./ProjectNavBar";
import CenteredBox from "./CenteredBox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

const ProjectRoute = ({ element }) => {
  const { projectId } = useParams();
  const [project, setProject, loading, error] = useProject(projectId);

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
    <>
      <ProjectNavBar project={project} />
      {cloneElement(element, { project, setProject })}
    </>
  );
};

export default ProjectRoute;
