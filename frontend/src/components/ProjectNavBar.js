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
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SettingsIcon from "@mui/icons-material/Settings";
import LoadingBoundary from "./LoadingBoundary";
import ProjectNavBarTitle from "./ProjectNavBarTitle";

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
          <LoadingBoundary
            fallback={
              <>
                <Box
                  sx={{
                    display: "flex",
                    mb: "auto",
                    pt: "2px",
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
                </Box>

                <IconButton disabled>
                  <MoreVert />
                </IconButton>
              </>
            }
          >
            <ProjectNavBarTitle />
          </LoadingBoundary>
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
                sx={{
                  ml: page.right ? "auto" : "none",
                  mr: page.right ? "unset" : 1,
                  boxShadow: matchPath(
                    {
                      path: page.match,
                      exact: true,
                      strict: false,
                    },
                    location.pathname
                  )
                    ? "inset 0px -4px 0px 0px #4184e9;"
                    : "",
                }}
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
                      pr: { xs: 0, sm: 1 },
                      "&:hover": {
                        color: "black",
                      },
                      color: matchPath(
                        {
                          path: page.match,
                          exact: true,
                          strict: false,
                        },
                        location.pathname
                      )
                        ? "black"
                        : "gray",

                      textTransform: "none",
                    }}
                  >
                    <Box sx={{ display: { xs: "none", sm: "unset" } }}>
                      {page.name}
                    </Box>
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
