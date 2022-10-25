import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import VisualizationsAPI from "../api/VisualizationsAPI";

const DeleteVisualizationDialog = ({ onClose, visualization, metadata }) => {
  const { visualizations, setVisualizations } = useContext(ProjectRouteContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleDeleteVisualization = () => {
    VisualizationsAPI.deleteVisualization(visualization.id)
      .then(() => {
        setVisualizations(
          visualizations.filter((x) => x.id !== visualization.id)
        );
        onClose();
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to delete visualization:" + error.message);
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
      <DialogTitle>Delete {metadata.name}</DialogTitle>
      <DialogContent>
        <DialogContentText variant="h7">
          Are you sure you want to delete this {metadata.name.toLowerCase()}?
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
          onClick={handleDeleteVisualization}
          loading={loading}
        >
          Yes, delete it
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default DeleteVisualizationDialog;
