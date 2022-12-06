import { useContext } from "react";
import { UserSettingsRouteContext } from "../routes/UserSettingsRoute";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EditUserButton from "../components/EditUserButton";

const UserAccount = () => {
  const { user } = useContext(UserSettingsRouteContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5">Account Details</Typography>
      <Typography variant="h7" sx={{ mb: 2, color: "#707070" }}>
        View your account details and manage your account.
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
          mb: 3,
        }}
      >
        <Typography variant="h7" sx={{ width: "160px", color: "gray" }}>
          Full name
        </Typography>
        <Typography variant="h7" sx={{ flex: 1, fontWeight: "bold" }}>
          {user.firstName} {user.lastName}
        </Typography>
        <EditUserButton />
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
          mb: 3,
        }}
      >
        <Typography variant="h7" sx={{ width: "160px", color: "gray" }}>
          Email address
        </Typography>
        <Typography variant="h7" sx={{ flex: 1, fontWeight: "bold" }}>
          {user.email}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
          mb: 3,
        }}
      >
        <Typography variant="h7" sx={{ width: "160px", color: "gray" }}>
          Maximum values
        </Typography>
        <Typography variant="h7" sx={{ flex: 1, fontWeight: "bold" }}>
          {user.maxValues.toLocaleString()}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
          mb: 3,
        }}
      >
        <Typography variant="h7" sx={{ width: "160px", color: "gray" }}>
          Rate limit
        </Typography>
        <Typography variant="h7" sx={{ flex: 1, fontWeight: "bold" }}>
          {user.maxValueInterval}{" "}
          {user.maxValueInterval > 1 ? "seconds" : "second"}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />
    </Box>
  );
};

export default UserAccount;
