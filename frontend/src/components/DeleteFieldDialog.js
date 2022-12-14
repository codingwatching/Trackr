import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useDeleteField } from "../hooks/useDeleteField";
import { useContext } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import formatError from "../utils/formatError";

const DeleteFieldDialog = ({ onClose, field }) => {
  const projectId = useContext(ProjectRouteContext);
  const [deleteField, deleteFieldContext] = useDeleteField(projectId);

  const handleDeleteField = () => {
    deleteField(field.id).then(onClose);
  };

  return (
    <>
      <DialogTitle>Delete Field</DialogTitle>
      <DialogContent>
        {deleteFieldContext.isError && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 1 }}>
              {formatError(deleteFieldContext.error)}
            </Alert>
          </Fade>
        )}
        <DialogContentText variant="h7">
          Are you sure you want to delete the "{field.name}" field?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: 1.5, mr: 1 }}>
        <Button
          autoFocus
          onClick={onClose}
          disabled={deleteFieldContext.isLoading}
        >
          Cancel
        </Button>
        <LoadingButton
          color="error"
          variant="outlined"
          onClick={handleDeleteField}
          loading={deleteFieldContext.isLoading}
        >
          Yes, delete it
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default DeleteFieldDialog;
