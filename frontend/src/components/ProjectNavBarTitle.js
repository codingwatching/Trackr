import { useProject } from "../hooks/useProject";
import { useContext } from "react";
import { ProjectRouteContext } from "../routes/ProjectRoute";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ProjectMenuButton from "./ProjectMenuButton";

const ProjectNavBarTitle = () => {
  const projectId = useContext(ProjectRouteContext);
  const project = useProject(projectId);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          mb: project.description && "auto",
          pt: project.description && "2px",
        }}
      >
        <AccountTreeRoundedIcon
          sx={{ fontSize: 30, mr: 2, color: "primary.main" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "black", flexGrow: 1, wordBreak: "break-all" }}
        >
          {project.name}
        </Typography>
        <Typography
          variant="h7"
          sx={{ color: "gray", flexGrow: 1, wordBreak: "break-all" }}
        >
          {project.description}
        </Typography>
      </Box>

      <ProjectMenuButton project={project} noSettings />
    </>
  );
};

export default ProjectNavBarTitle;
