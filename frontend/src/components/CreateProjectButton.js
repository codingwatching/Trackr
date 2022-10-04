import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import ProjectsAPI from "../api/ProjectsAPI";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CreateProjectButton = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState();

  const handleOnClick = () => {
    ProjectsAPI.createProject()
      .then((result) => {
        navigate("/projects/edit/" + result.data.id);
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
      <LoadingButton
        loading={loading}
        type="submit"
        variant="contained"
        onClick={handleOnClick}
        sx={{ textTransform: "none" }}
        disableElevation
      >
        Create Project
      </LoadingButton>

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
