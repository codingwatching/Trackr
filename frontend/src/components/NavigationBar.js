import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { useLocation, matchPath } from "react-router-dom";

const pages = [
  { name: "Dashboard", href: "/", match: "/" },
  {
    name: "Projects",
    href: "/projects",
    match: "/projects/*",
    listable: <p>hi</p>,
  },
];
const settings = ["Settings", "Logout"];

const NavigationBar = () => {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "white", boxShadow: "0px 2px 5px -1px #dbd6d6" }}
    >
      <Container>
        <Toolbar disableGutters>
          {/* Hamburger Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo */}
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                color: "black",
                mr: 1,
                textTransform: "lowercase",
              }}
            >
              <InsertChartIcon
                sx={{
                  color: "primary.main",
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  ml: -0.5,
                  fontWeight: 500,
                  color: "black",
                  userSelect: "none",
                  textDecoration: "none",
                }}
              >
                trackr
              </Typography>
            </Button>
          </Box>

          {/* Navlinks */}
          <Box
            sx={{
              justifyContent: "left",
              display: { xs: "none", md: "flex" },
              color: "black",
            }}
          >
            {pages.map((page) => (
              <Box
                key={page.name}
                sx={{
                  boxShadow: matchPath(
                    {
                      path: page.match,
                      exact: true,
                      strict: true,
                    },
                    location.pathname
                  )
                    ? "inset 0px -4px 0px 0px #0052cc;"
                    : "",
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  endIcon={page.listable && <KeyboardArrowDownIcon />}
                  sx={{
                    my: 2,
                    color: "black",
                    textTransform: "none",
                  }}
                >
                  {page.name}
                </Button>
              </Box>
            ))}
          </Box>

          {/* Settings button */}
          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "right" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
