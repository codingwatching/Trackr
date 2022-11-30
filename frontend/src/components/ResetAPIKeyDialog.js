import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import ProjectsAPI from "../api/ProjectsAPI";

const ResetAPIKeyDialog = ({ onClose }) => {
  const { project, setProject } = useContext(ProjectRouteContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleResetAPIKey = () => {
    ProjectsAPI.updateProject(
      project.id,
      project.name,
      project.description,
      true
    )
      .then((result) => {
        setProject({
          ...project,
          apiKey: result.data.apiKey,
          updatedAt: new Date(),
        });

        setLoading(false);
        setError();
        onClose();
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to reset API key: " + error.message);
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
      <DialogTitle>Reset API Key</DialogTitle>
      <DialogContent>
        <DialogContentText variant="h7">
          Are you sure you want to reset the API key for this project?
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
          onClick={handleResetAPIKey}
          loading={loading}
        >
          Yes, reset it
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default ResetAPIKeyDialog;
