import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useContext, useState } from "react";
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
import FieldsAPI from "../api/FieldsAPI";

const CreateFieldDialog = ({ onBack, onClose }) => {
  const { project, fields, setFields } = useContext(ProjectRouteContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    FieldsAPI.addField(project.id, data.get("name"))
      .then((result) => {
        setFields([
          ...fields,
          {
            id: result.data.id,
            name: data.get("name"),
          },
        ]);

        setLoading(false);

        if (onBack) {
          onBack();
        } else {
          onClose();
        }
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to add field: " + error.message);
        }
      });

    setLoading(true);
    setError();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {onBack && (
          <IconButton
            color="primary"
            sx={{ mr: 1 }}
            disabled={loading}
            onClick={onBack}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        Add Field
      </DialogTitle>
      <DialogContent sx={{ mb: -2 }}>
        {error && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 1 }}>
              {error}
            </Alert>
          </Fade>
        )}
        <DialogContentText>
          Choose a name that'll help you identify this field easily like:
          temperature, humidity, or atmospheric pressure.
        </DialogContentText>

        <TextField
          error={error ? true : false}
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
          loading={loading}
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
