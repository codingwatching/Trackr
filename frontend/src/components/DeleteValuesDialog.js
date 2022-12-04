import { useState, useContext } from "react";
import { ProjectRouteContext } from "../routes/ProjectRoute";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import ValuesAPI from "../api/ValuesAPI";

const DeleteValuesDialog = ({ field, onClose }) => {
  const { fields, setFields } = useContext(ProjectRouteContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleDeleteValues = () => {
    ValuesAPI.deleteValues(field.id)
      .then(() => {
        setFields(
          fields.map((f) =>
            f.id === field.id
              ? {
                  id: field.id,
                  createdAt: field.createdAt,
                  name: field.name,
                  numberOfValues: 0,
                }
              : f
          )
        );

        onClose();
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to delete values: " + error.message);
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
      <DialogTitle>Delete Values</DialogTitle>
      <DialogContent>
        <DialogContentText variant="h7">
          Are you sure you want to delete all the values from the "{field.name}"
          field?
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
          onClick={handleDeleteValues}
          loading={loading}
        >
          Yes, delete them
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default DeleteValuesDialog;
