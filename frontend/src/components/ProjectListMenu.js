import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import MenuItem from "@mui/material/MenuItem";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import CreateProjectButton from "./CreateProjectButton";

const ProjectListMenu = ({ closeSubMenu }) => {
  const [projects, , loading, error] = useProjects();
  const navigate = useNavigate();
  const MAX_PROJECTS = 3;

  const handleViewAllProjects = (event) => {
    event.preventDefault();

    navigate("/projects");
    closeSubMenu();
  };

  const handleViewProject = (event, project) => {
    event.preventDefault();

    navigate("/projects/" + project.id);
    closeSubMenu();
  };

  const errorElement = error && (
    <MenuItem
      disabled
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "red",
      }}
    >
      <ErrorIcon sx={{ fontSize: 30, mb: 1 }} />
      <Typography
        variant="subtitle2"
        sx={{ userSelect: "none", color: "darkred" }}
      >
        {error}
      </Typography>
    </MenuItem>
  );

  const loadingElement = loading && (
    <>
      <MenuItem disabled sx={{ mb: -0.25 }}>
        <Skeleton variant="text" width={60} height={30} />
      </MenuItem>
      <MenuItem disabled sx={{ mb: -0.25 }}>
        <Skeleton
          variant="rectangular"
          width={25}
          height={25}
          sx={{ mr: 1.5, my: 0 }}
        />
        <Skeleton variant="text" width={100} height={25} />
      </MenuItem>
      <MenuItem disabled sx={{ mb: -0.25 }}>
        <Skeleton
          variant="rectangular"
          width={25}
          height={25}
          sx={{ mr: 1.5, my: 0 }}
        />
        <Skeleton variant="text" width={130} height={25} />
      </MenuItem>
      <MenuItem disabled>
        <Skeleton
          variant="rectangular"
          width={25}
          height={25}
          sx={{ mr: 1.5, my: 0 }}
        />
        <Skeleton variant="text" width={90} height={25} />
      </MenuItem>
      <Divider />
    </>
  );

  return (
    <>
      {errorElement}
      {loadingElement}
      {!error && !loading && projects.length > 0 && (
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
      )}

      <Link href={"/projects/"} underline="none">
        <MenuItem
          onClick={handleViewAllProjects}
          sx={{ py: 1, pr: 8, alignItems: "start" }}
        >
          <Typography
            variant="subtitle2"
            color="#2a2a2a"
            sx={{ fontWeight: 400 }}
          >
            View all projects
          </Typography>
        </MenuItem>
      </Link>

      <CreateProjectButton menuItem={closeSubMenu} />
    </>
  );
};

export default ProjectListMenu;
