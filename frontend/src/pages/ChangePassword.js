import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

const ChangePassword = () => {
  const user = useUser();
  const [updateUser, updateUserContext] = useUpdateUser();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const handleChangePassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get("currentPassword")) {
      setError("Please enter your current password.");
      return;
    }

    if (!data.get("newPassword")) {
      setError("Please enter your new password.");
      return;
    }

    if (data.get("newPassword") !== data.get("repeatNewPassword")) {
      setError("New password does not match confirm new password.");
      return;
    }

    updateUser({
      firstName: user.firstName,
      lastName: user.lastName,
      currentPassword: data.get("currentPassword"),
      newPassword: data.get("newPassword"),
    })
      .then(() => {
        setSuccess("Password changed successfully.");
        setError();
      })
      .catch((error) => {
        setSuccess();
        setError(error?.response?.data?.error);
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5">Change Password</Typography>
      <Typography variant="h7" sx={{ mb: 2, color: "#707070" }}>
        Enter your current password and a new password.
      </Typography>

      {(error || success) && (
        <Fade in={error || success ? true : false}>
          <Alert severity={error ? "error" : "success"} sx={{ mb: 3 }}>
            {error || success}
          </Alert>
        </Fade>
      )}

      <Box
        component="form"
        onSubmit={handleChangePassword}
        noValidate
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          type="password"
          label="Current Password"
          name="currentPassword"
          error={error ? true : false}
          disabled={updateUserContext.isLoading}
          required
          sx={{ mb: 2.5 }}
        />

        <Typography variant="h7" sx={{ mb: 2, color: "#707070" }}>
          Make sure to choose a strong new password.
        </Typography>

        <TextField
          type="password"
          label="New Password"
          name="newPassword"
          error={error ? true : false}
          disabled={updateUserContext.isLoading}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          type="password"
          label="Confirm New Password"
          name="repeatNewPassword"
          error={error ? true : false}
          disabled={updateUserContext.isLoading}
          required
        />

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            mb: 3,
          }}
        >
          <LoadingButton
            loading={updateUserContext.isLoading}
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              mr: 1.5,
              maxWidth: 180,
              flexGrow: 1,
            }}
          >
            Change Password
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
