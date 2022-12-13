import { useProject } from "../hooks/useProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useContext } from "react";
import { ProjectRouteContext } from "../routes/ProjectRoute";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import formatError from "../utils/formatError";

const ResetAPIKeyDialog = ({ onClose }) => {
  const [updateProject, updateProjectContext] = useUpdateProject();
  const projectId = useContext(ProjectRouteContext);
  const project = useProject(projectId);

  const handleResetAPIKey = () => {
    updateProject({
      id: project.id,
      name: project.name,
      description: project.description,
      resetAPIKey: true,
    }).then(() => onClose());
  };

  return (
    <>
      <DialogTitle>Reset API Key</DialogTitle>
      <DialogContent>
        {updateProjectContext.isError && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 1 }}>
              {formatError(updateProjectContext.error)}
            </Alert>
          </Fade>
        )}
        <DialogContentText variant="h7">
          Are you sure you want to reset the API key for this project?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: 1.5, mr: 1 }}>
        <Button
          autoFocus
          onClick={onClose}
          disabled={updateProjectContext.isLoading}
        >
          Cancel
        </Button>
        <LoadingButton
          color="error"
          variant="outlined"
          onClick={handleResetAPIKey}
          loading={updateProjectContext.isLoading}
        >
          Yes, reset it
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default ResetAPIKeyDialog;
