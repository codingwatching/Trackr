import { UserSettingsRouteContext } from "../routes/UserSettingsRoute";
import { useContext, useState } from "react";
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
import UsersAPI from "../api/UsersAPI";

const EditUserDialog = ({ onClose }) => {
  const { setUser, user } = useContext(UserSettingsRouteContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    UsersAPI.updateUser(data.get("firstName"), data.get("lastName"))
      .then(() => {
        setUser({
          ...user,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
        });
        setLoading(false);

        onClose();
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to change name: " + error.message);
        }
      });

    setLoading(true);
    setError();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        Edit name
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
          You can change your first name and last name to anything you want.
        </DialogContentText>

        <TextField
          error={error ? true : false}
          margin="normal"
          required
          fullWidth
          autoFocus
          defaultValue={user.firstName}
          name="firstName"
          label="First Name"
          type="text"
        />

        <TextField
          error={error ? true : false}
          margin="normal"
          required
          fullWidth
          autoFocus
          defaultValue={user.lastName}
          name="lastName"
          label="Last Name"
          type="text"
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
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

export default EditUserDialog;
