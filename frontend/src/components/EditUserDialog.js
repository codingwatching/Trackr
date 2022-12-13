import { useUser } from "../hooks/useUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
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

const EditUserDialog = ({ onClose }) => {
  const [updateUser, updateUserContext] = useUpdateUser();
  const user = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    updateUser({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    }).then(() => onClose());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        Edit name
      </DialogTitle>
      <DialogContent sx={{ mb: -2 }}>
        {updateUserContext.isError && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 1 }}>
              {formatError(updateUserContext.error)}
            </Alert>
          </Fade>
        )}
        <DialogContentText>
          You can change your first name and last name to anything you want.
        </DialogContentText>

        <TextField
          error={updateUserContext.isError}
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
          error={updateUserContext.isError}
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
          loading={updateUserContext.isLoading}
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
