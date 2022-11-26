import { createElement, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DeleteFieldDialog from "./DeleteFieldDialog";
import DeleteValuesDialog from "./DeleteValuesDialog";
import EditFieldDialog from "./EditFieldDialog";
import EditIcon from "@mui/icons-material/Edit";

const FieldMenuButton = ({ field }) => {
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

  const openDeleteFieldDialog = () => {
    setDialogOpen(true);
    setAnchorEl(null);

    setDialogElement(
      createElement(DeleteFieldDialog, { field, onClose: closeDialog }, {})
    );
  };

  const openDeleteValuesDialog = () => {
    setDialogOpen(true);
    setAnchorEl(null);

    setDialogElement(
      createElement(DeleteValuesDialog, { field, onClose: closeDialog }, {})
    );
  };

  const openEditFieldDialog = () => {
    setDialogOpen(true);
    setAnchorEl(null);

    setDialogElement(
      createElement(EditFieldDialog, { field, onClose: closeDialog }, {})
    );
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
        <MenuItem onClick={openEditFieldDialog}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>

        <MenuItem onClick={openDeleteValuesDialog}>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography>Delete All Values</Typography>
          </ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={openDeleteFieldDialog}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="error">Delete Field</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        {dialogElement}
      </Dialog>
    </>
  );
};

export default FieldMenuButton;
