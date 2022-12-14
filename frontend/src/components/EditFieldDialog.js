import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useUpdateField } from "../hooks/useUpdateField";
import { useContext } from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import formatError from "../utils/formatError";

const EditFieldDialog = ({ field, onClose }) => {
  const projectId = useContext(ProjectRouteContext);
  const [updateField, updateFieldContext] = useUpdateField(projectId);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    updateField({ id: field.id, name: data.get("name") }).then(() => {
      onClose();
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        Rename Field
      </DialogTitle>
      <DialogContent sx={{ mb: -2 }}>
        {updateFieldContext.isError && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 1 }}>
              {formatError(updateFieldContext.error)}
            </Alert>
          </Fade>
        )}
        <DialogContentText>
          You can rename your field if you've made a typo or just want to change
          the name.
        </DialogContentText>

        <TextField
          error={updateFieldContext.isError}
          margin="normal"
          required
          fullWidth
          autoFocus
          defaultValue={field.name}
          name="name"
          label="Name"
          type="text"
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <Button
          autoFocus
          onClick={onClose}
          disabled={updateFieldContext.isLoading}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={updateFieldContext.isLoading}
          variant="contained"
          type="submit"
          disableElevation
          autoFocus
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Box>
  );
};

export default EditFieldDialog;
