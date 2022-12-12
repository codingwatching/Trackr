import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import MenuItem from "@mui/material/MenuItem";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const ProjectListSubMenu = ({ closeSubMenu }) => {
  const MAX_PROJECTS = 3;
  const projects = useProjects();
  const navigate = useNavigate();

  const handleViewProject = (event, project) => {
    event.preventDefault();

    navigate("/projects/" + project.id);
    closeSubMenu();
  };

  return (
    projects.length > 0 && (
      <>
        <MenuItem disabled>
          <Typography variant="subtitle2">Recent</Typography>
        </MenuItem>
        {projects.slice(0, MAX_PROJECTS).map((project) => (
          <Link
            href={"/projects/" + project.id}
            key={project.id}
            underline="none"
          >
            <MenuItem
              onClick={(event) => handleViewProject(event, project)}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AccountTreeRoundedIcon
                sx={{
                  fontSize: 25,
                  color: "white",
                  backgroundColor: "primary.main",
                  mr: 1.5,
                  p: 0.25,
                  borderRadius: 1,
                }}
              />

              <Typography
                variant="subtitle2"
                color="#2a2a2a"
                sx={{ fontWeight: 400 }}
              >
                {project.name}
              </Typography>
            </MenuItem>
          </Link>
        ))}
        <Divider sx={{ my: 1 }} />
      </>
    )
  );
};

export default ProjectListSubMenu;
