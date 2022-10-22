import { createElement, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import CreateFieldDialog from "./CreateFieldDialog";
import DeleteVisualizationDialog from "./DeleteVisualizationDialog";
import VisualizationsEditor from "./visualizations/VisualizationsEditor";

const VisualizationMenuButton = ({
  visualizationType,
  visualization,
  metadata,
  disabled,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogElement, setDialogElement] = useState();

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
      createElement(
        DeleteVisualizationDialog,
        { visualization, metadata, onClose: closeDialog },
        {}
      )
    );
  };

  const openEditDialog = () => {
    setDialogOpen(true);
    setAnchorEl(null);

    setDialogElement(
      createElement(
        VisualizationsEditor,
        {
          visualizationType,
          visualization,
          metadata,
          onClose: closeDialog,
          onAddField: openAddFieldDialog,
        },
        {}
      )
    );
  };

  const openAddFieldDialog = () => {
    setDialogElement(
      createElement(CreateFieldDialog, {
        onClose: closeDialog,
        onBack: openEditDialog,
      })
    );
  };

  if (disabled) {
    return (
      <IconButton disabled>
        <MoreHorizIcon />
      </IconButton>
    );
  }

  return (
    <>
      <IconButton onClick={openDropdownMenu}>
        <MoreHorizIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeDropdownMenu}
      >
        <MenuItem onClick={openEditDialog}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit {metadata.name}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={openDeleteDialog}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="error">Delete {metadata.name}</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        {dialogElement}
      </Dialog>
    </>
  );
};

export default VisualizationMenuButton;
