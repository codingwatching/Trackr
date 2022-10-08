import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MoreVert from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ProjectsAPI from "../api/ProjectsAPI";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ProjectMenuButton = ({ project, projects, setProjects, noSettings }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const openDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdownMenu = () => {
    setAnchorEl(null);
  };

  const closeDialog = () => {
    if (loading) {
      return;
    }

    setDialogOpen(false);
  };

  const openDeleteDialog = () => {
    setError();
    setLoading(false);
    setDialogOpen(true);
    setAnchorEl(null);
  };

  const handleDeleteProject = () => {
    ProjectsAPI.deleteProject(project.id)
      .then(() => {
        setDialogOpen(false);
        navigate("/projects");

        if (setProjects && projects) {
          setProjects(projects.filter((x) => x.id !== project.id));
        }
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to delete project: " + error.message);
        }
      });

    setLoading(true);
  };

  const handleCopyAPIKey = () => {
    navigator.clipboard.writeText(project.apiKey);
    setAnchorEl(null);
  };

  const handleSettingsProject = () => {
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
          <MenuItem onClick={handleSettingsProject}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
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
        {error ? (
          <>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
              <DialogContentText>{error}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={closeDialog}>
                Okay
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText variant="h7">
                Are you sure you want to delete the "{project.name}" project?
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mb: 1.5, mr: 1 }}>
              {!loading && (
                <Button autoFocus onClick={closeDialog}>
                  Cancel
                </Button>
              )}
              <LoadingButton
                color="error"
                variant="outlined"
                onClick={handleDeleteProject}
                loading={loading}
              >
                Yes, delete it
              </LoadingButton>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ProjectMenuButton;
