import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import ProjectsAPI from "../api/ProjectsAPI";

const DeleteProjectDialog = ({ onClose, project, projects, setProjects }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleDeleteProject = () => {
    ProjectsAPI.deleteProject(project.id)
      .then(() => {
        onClose();
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

  return error ? (
    <>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{error}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Okay
        </Button>
      </DialogActions>
    </>
  ) : (
    <>
      <DialogTitle>Delete Project</DialogTitle>
      <DialogContent>
        <DialogContentText variant="h7">
          Are you sure you want to delete the "{project.name}" project?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: 1.5, mr: 1 }}>
        {!loading && (
          <Button autoFocus onClick={onClose}>
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
  );
};

export default DeleteProjectDialog;
