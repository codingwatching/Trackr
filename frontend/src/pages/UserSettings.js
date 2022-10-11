import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import UsersAPI from "../api/UsersAPI";

const UserSettings = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("currentPassword") && !data.get("newPassword")) {
      setError("You forgot to provide a new password.");
      return;
    }

    if (
      data.get("currentPassword") &&
      data.get("newPassword") &&
      data.get("newPassword") !== data.get("repeatNewPassword")
    ) {
      setError("New password does not match repeated new password.");
      return;
    }

    UsersAPI.updateUser(
      data.get("firstName"),
      data.get("lastName"),
      data.get("currentPassword"),
      data.get("newPassword")
    )
      .then(() => {
        setUser({
          ...user,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
        });

        setLoading(false);
        setSuccess("User settings updated successfully.");
        setError();
      })
      .catch((error) => {
        setLoading(false);
        setSuccess();

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to update user settings: " + error.message);
        }
      });

    setLoading(true);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
          background: "#0000000a",
          p: 2,
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Avatar sx={{ width: 80, height: 80, mr: 3 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography variant="h5">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="h7" sx={{ color: "gray" }}>
            Maximum {user.maxValues.toLocaleString()} values
          </Typography>
        </Box>
      </Box>

      {(error || success) && (
        <Fade in={error || success ? true : false}>
          <Alert severity={error ? "error" : "success"} sx={{ mb: 2, mt: -1 }}>
            {error || success}
          </Alert>
        </Fade>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Profile
        </Typography>
      </Box>

      <Divider />

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 3, display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="First Name"
          name="firstName"
          error={error ? true : false}
          required
          defaultValue={user.firstName}
          sx={{ mb: 2.5 }}
        />

        <TextField
          label="Last Name"
          name="lastName"
          error={error ? true : false}
          required
          defaultValue={user.lastName}
          sx={{ mb: 2.5 }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Change Password
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <TextField
          type="password"
          label="Current Password"
          name="currentPassword"
          error={error ? true : false}
          value={loading ? "" : undefined}
          required
          sx={{ mb: 2.5 }}
        />

        <TextField
          type="password"
          label="New Password"
          name="newPassword"
          value={loading ? "" : undefined}
          error={error ? true : false}
          required
          sx={{ mb: 2.5 }}
        />

        <TextField
          type="password"
          label="Repeat New Password"
          name="repeatNewPassword"
          value={loading ? "" : undefined}
          error={error ? true : false}
          required
          sx={{ mb: 2.5 }}
        />

        <Divider />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              my: 2,
              mr: 1.5,
              maxWidth: 180,
              flexGrow: 1,
              textTransform: "none",
            }}
          >
            Save Changes
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default UserSettings;
