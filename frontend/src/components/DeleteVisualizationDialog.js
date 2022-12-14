import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useContext } from "react";
import { useDeleteVisualization } from "../hooks/useDeleteVisualization";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import formatError from "../utils/formatError";

const DeleteVisualizationDialog = ({ onClose, visualization, metadata }) => {
  const projectId = useContext(ProjectRouteContext);
  const [deleteVisualization, deleteVisualizationContext] =
    useDeleteVisualization(projectId);

  const handleDeleteVisualization = () => {
    deleteVisualization(visualization.id).then(onClose);
  };

  return (
    <>
      <DialogTitle>Delete {metadata.name}</DialogTitle>
      <DialogContent>
        {deleteVisualizationContext.isError && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 1 }}>
              {formatError(deleteVisualizationContext.error)}
            </Alert>
          </Fade>
        )}
        <DialogContentText variant="h7">
          Are you sure you want to delete this {metadata.name.toLowerCase()}?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: 1.5, mr: 1 }}>
        <Button
          autoFocus
          onClick={onClose}
          disabled={deleteVisualizationContext.isLoading}
        >
          Cancel
        </Button>
        <LoadingButton
          color="error"
          variant="outlined"
          onClick={handleDeleteVisualization}
          loading={deleteVisualizationContext.isLoading}
        >
          Yes, delete it
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default DeleteVisualizationDialog;
