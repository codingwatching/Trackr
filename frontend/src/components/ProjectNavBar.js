import { useLocation, matchPath, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SettingsIcon from "@mui/icons-material/Settings";

import ProjectMenuButton from "./ProjectMenuButton";
const ProjectNavBar = ({ project }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pages = [
    {
      name: "Home",
      icon: <HomeIcon />,
      href: "/projects/" + project.id,
      match: "/projects/" + project.id,
    },
    {
      name: "Fields",
      icon: <TableChartIcon />,
      href: "/projects/fields/" + project.id,
      match: "/projects/fields/" + project.id,
    },
    {
      name: "API",
      icon: <VpnKeyIcon />,
      href: "/projects/api/" + project.id,
      match: "/projects/api/" + project.id,
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      right: true,
      href: "/projects/settings/" + project.id,
      match: "/projects/settings/*",
    },
  ];

  /*    margin-bottom: auto;
    padding-top: 4px;*/

  return (
    <AppBar
      position="static"
      sx={{ background: "#fafbfc", boxShadow: "0px 0px 4px -1px #9d9d9d" }}
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
                <Button
                  onClick={() => navigate(page.href)}
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
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ProjectNavBar;
