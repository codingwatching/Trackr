import { createElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteProjectDialog from "./DeleteProjectDialog";

const ProjectMenuButton = ({ project, noSettings }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogElement, setDialogElement] = useState();
  const navigate = useNavigate();

  const openDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdownMenu = () => {
    setAnchorEl(null);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const openDeleteDialog = () => {
    setDialogOpen(true);
    setAnchorEl(null);

    setDialogElement(
      createElement(DeleteProjectDialog, { project, onClose: closeDialog }, {})
    );
  };

  const handleCopyAPIKey = () => {
    navigator.clipboard.writeText(project.apiKey);
    setAnchorEl(null);
  };

  const handleSettingsProject = (event) => {
    event.preventDefault();

    navigate("/projects/settings/" + project.id);
  };

  return (
    <>
      <IconButton onClick={openDropdownMenu}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeDropdownMenu}
      >
        {!noSettings && (
          <Link
            href={"/projects/settings/" + project.id}
            underline="none"
            sx={{ color: "unset" }}
          >
            <MenuItem onClick={handleSettingsProject}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
          </Link>
        )}
        <MenuItem onClick={handleCopyAPIKey}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy API Key</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={openDeleteDialog}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="error">Delete</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        {dialogElement}
      </Dialog>
    </>
  );
};

export default ProjectMenuButton;
