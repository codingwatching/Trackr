import { useNavigate } from "react-router-dom";
import { useDeleteProject } from "../hooks/useDeleteProject";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import formatError from "../utils/formatError";

const DeleteProjectDialog = ({ onClose, project }) => {
  const [deleteProject, deleteProjectContext] = useDeleteProject();
  const navigate = useNavigate();

  const handleDeleteProject = () => {
    deleteProject(project.id).then(() => {
      onClose();
      navigate("/projects");
    });
  };

  return deleteProjectContext.isError ? (
    <>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {formatError(deleteProjectContext.error)}
        </DialogContentText>
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
        <Button
          autoFocus
          onClick={onClose}
          disabled={deleteProjectContext.isLoading}
        >
          Cancel
        </Button>
        <LoadingButton
          color="error"
          variant="outlined"
          onClick={handleDeleteProject}
          loading={deleteProjectContext.isLoading}
        >
          Yes, delete it
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default DeleteProjectDialog;
