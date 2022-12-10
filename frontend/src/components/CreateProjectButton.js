import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import ProjectsAPI from "../api/ProjectsAPI";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const CreateProjectButton = ({ sx, menuItem, icon }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState();

  const handleOnClick = () => {
    ProjectsAPI.createProject()
      .then((result) => {
        navigate("/projects/settings/" + result.data.id);
        mutate("/api/projects");
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to create new project: " + error.message);
        }

        setDialogOpen(true);
      });

    setLoading(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {menuItem ? (
        <MenuItem
          onClick={() => {
            menuItem();
            handleOnClick();
          }}
          sx={{ py: 1, pr: 8, alignItems: "start" }}
        >
          <Typography
            variant="subtitle2"
            color="#2a2a2a"
            sx={{ fontWeight: 400 }}
          >
            Create project
          </Typography>
        </MenuItem>
      ) : (
        <LoadingButton
          sx={sx}
          startIcon={icon && <AddRoundedIcon />}
          loading={loading}
          type="submit"
          variant="contained"
          onClick={handleOnClick}
          disableElevation
        >
          Create Project
        </LoadingButton>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateProjectButton;
