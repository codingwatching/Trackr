import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import CreateProjectButton from "./CreateProjectButton";
import ErrorBoundary from "./ErrorBoundary";
import LoadingBoundary from "./LoadingBoundary";
import ProjectListSubMenu from "./ProjectListSubMenu";

const ProjectListMenu = ({ closeSubMenu }) => {
  const navigate = useNavigate();

  const handleViewAllProjects = (event) => {
    event.preventDefault();

    navigate("/projects");
    closeSubMenu();
  };

  const errorFallback = ({ error }) => (
    <>
      <MenuItem
        disabled
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "black",
          maxWidth: "200px",
          textAlign: "center",
          whiteSpace: "pre-wrap",
        }}
      >
        <ErrorIcon sx={{ fontSize: 30, mb: 1 }} />
        <Typography variant="subtitle2" sx={{ userSelect: "none" }}>
          {error}
        </Typography>
      </MenuItem>
      <Divider sx={{ my: 1 }} />
    </>
  );

  const loadingFallback = (
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
      <ErrorBoundary fallback={errorFallback}>
        <LoadingBoundary fallback={loadingFallback}>
          <ProjectListSubMenu closeSubMenu={closeSubMenu} />
        </LoadingBoundary>
      </ErrorBoundary>

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
