import { useContext, useState } from "react";
import { UserSettingsRouteContext } from "../routes/UserSettingsRoute";
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

const UserAccount = () => {
  const { user } = useContext(UserSettingsRouteContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", px: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Avatar sx={{ width: 55, height: 55, mr: 2 }} />
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
          <Typography variant="h7" sx={{ color: "#545454" }}>
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />
    </Box>
  );
};

export default UserAccount;
