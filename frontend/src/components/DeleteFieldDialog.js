import { useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import FieldsAPI from "../api/FieldsAPI";

const DeleteFieldDialog = ({ onClose, field, fields, setFields }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  

  const handleDeleteField = () => {
    FieldsAPI.deleteField(field.id)
      .then(() => {
        onClose();
        
        if (setFields && fields) {
          setFields(fields.filter((x) => x.id !== field.id));
        }
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to delete field: " + error.message);
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
      <DialogTitle>Delete Field</DialogTitle>
      <DialogContent>
        <DialogContentText variant="h7">
          Are you sure you want to delete the "{field.name}" field?
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
          onClick={handleDeleteField}
          loading={loading}
        >
          Yes, delete it
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default DeleteFieldDialog;
