import {
  useLocation,
  matchPath,
  useNavigate,
  useParams,
} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SettingsIcon from "@mui/icons-material/Settings";
import ProjectMenuButton from "./ProjectMenuButton";

const ProjectNavBar = ({ project, loading }) => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const pages = [
    {
      name: "Home",
      icon: <HomeIcon />,
      href: "/projects/" + projectId,
      match: "/projects/:projectId",
    },
    {
      name: "Fields",
      icon: <TableChartIcon />,
      href: "/projects/fields/" + projectId,
      match: "/projects/fields/:projectId",
    },
    {
      name: "API",
      icon: <VpnKeyIcon />,
      href: "/projects/api/" + projectId,
      match: "/projects/api/:projectId",
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      right: true,
      href: "/projects/settings/" + projectId,
      match: "/projects/settings/:projectId",
    },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: "white",
        borderBottom: "1px solid #0000001f",
        boxShadow: "none",
      }}
    >
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
            py: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              mb: (loading || project.description) && "auto",
              pt: (loading || project.description) && "2px",
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
            {loading ? (
              <>
                <Skeleton
                  variant="text"
                  width={200}
                  height={46}
                  sx={{ mt: -1 }}
                />
                <Skeleton
                  variant="text"
                  width={280}
                  height={30}
                  sx={{ mt: -1, mb: -0.4 }}
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </Box>

          <ProjectMenuButton project={project} noSettings disabled={loading} />
        </Box>

        <Divider />

        <Toolbar disableGutters>
          <Box
            sx={{
              justifyContent: "left",
              display: "flex",
              flexGrow: 1,
              color: "black",
            }}
          >
            {pages.map((page) => (
              <Box
                key={page.name}
                sx={{ marginLeft: page.right ? "auto" : "none" }}
              >
                <Link href={page.href} underline="none">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(page.href);
                    }}
                    startIcon={page.icon}
                    sx={{
                      my: 2,
                      mr: 1,
                      color: "black",
                      background: matchPath(
                        {
                          path: page.match,
                          exact: true,
                          strict: false,
                        },
                        location.pathname
                      )
                        ? "rgb(70 144 255 / 13%)"
                        : "",
                      textTransform: "none",
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ProjectNavBar;
