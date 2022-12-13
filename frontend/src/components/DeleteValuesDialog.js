import { useDeleteValues } from "../hooks/useDeleteValues";
import { useContext } from "react";
import { ProjectRouteContext } from "../routes/ProjectRoute";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import formatError from "../utils/formatError";

const DeleteValuesDialog = ({ field, onClose }) => {
  const projectId = useContext(ProjectRouteContext);
  const [deleteValues, deleteValuesContext] = useDeleteValues(projectId);

  const handleDeleteValues = () => {
    deleteValues(field.id).then(() => onClose());
  };

  return (
    <>
      <DialogTitle>Delete Values</DialogTitle>
      <DialogContent>
        {deleteValuesContext.isError && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 1 }}>
              {formatError(deleteValuesContext.error)}
            </Alert>
          </Fade>
        )}
        <DialogContentText variant="h7">
          Are you sure you want to delete all the values from the "{field.name}"
          field?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: 1.5, mr: 1 }}>
        <Button
          autoFocus
          onClick={onClose}
          disabled={deleteValuesContext.isLoading}
        >
          Cancel
        </Button>
        <LoadingButton
          color="error"
          variant="outlined"
          onClick={handleDeleteValues}
          loading={deleteValuesContext.isLoading}
        >
          Yes, delete them
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default DeleteValuesDialog;
