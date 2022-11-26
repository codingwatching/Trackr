import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useContext, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import FieldsAPI from "../api/FieldsAPI";

const EditFieldDialog = ({ field, onClose }) => {
  const { fields, setFields } = useContext(ProjectRouteContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    FieldsAPI.updateField(field.id, data.get("name"))
      .then((result) => {
        setFields(
          fields.map((f) =>
            f.id === field.id
              ? {
                  id: field.id,
                  createdAt: field.createdAt,
                  name: data.get("name"),
                }
              : f
          )
        );

        setLoading(false);
        onClose();
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to rename field: " + error.message);
        }
      });

    setLoading(true);
    setError();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        Rename Field
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
          You can rename your field if you've made a typo or just want to change
          the name.
        </DialogContentText>

        <TextField
          error={error ? true : false}
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
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          disableElevation
          autoFocus
        >
          Save Field
        </LoadingButton>
      </DialogActions>
    </Box>
  );
};

export default EditFieldDialog;
