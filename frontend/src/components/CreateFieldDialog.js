import { useCreateField } from "../hooks/useCreateField";
import formatError from "../utils/formatError";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { ProjectRouteContext } from "../routes/ProjectRoute";

const CreateFieldDialog = ({ onBack, onClose }) => {
  const projectId = useContext(ProjectRouteContext);
  const [createField, createFieldContext] = useCreateField();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    createField({ projectId, name: data.get("name") }).then(() => {
      if (onBack) {
        onBack();
      } else {
        onClose();
      }
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {onBack && (
          <IconButton
            color="primary"
            sx={{ mr: 1 }}
            disabled={createFieldContext.isLoading}
            onClick={onBack}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        Add Field
      </DialogTitle>
      <DialogContent sx={{ mb: -2 }}>
        {createFieldContext.isError && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 1 }}>
              {formatError(createFieldContext.error)}
            </Alert>
          </Fade>
        )}
        <DialogContentText>
          Choose a name that'll help you identify this field easily like:
          temperature, humidity, or atmospheric pressure.
        </DialogContentText>

        <TextField
          error={createFieldContext.isError}
          margin="normal"
          required
          fullWidth
          autoFocus
          name="name"
          label="Name"
          type="text"
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <LoadingButton
          loading={createFieldContext.isLoading}
          type="submit"
          disableElevation
          autoFocus
        >
          Create Field
        </LoadingButton>
      </DialogActions>
    </Box>
  );
};

export default CreateFieldDialog;
