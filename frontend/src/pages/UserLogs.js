import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CenteredBox from "../components/CenteredBox";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingBoundary from "../components/LoadingBoundary";
import UserLogsTable from "../components/UserLogsTable";

const UserLogs = () => {
  const [search, setSearch] = useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5">Activity Logs</Typography>
      <Typography variant="h7" sx={{ mb: 2, color: "#707070" }}>
        View your recent activity and access history.
      </Typography>

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search"
        sx={{ mb: 2, color: "blue" }}
        size="small"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ErrorBoundary
        fallback={({ error }) => (
          <CenteredBox sx={{ mt: 2 }}>
            <ErrorIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography
              variant="h7"
              sx={{ mb: 10, userSelect: "none", textAlign: "center" }}
            >
              {error}
            </Typography>
          </CenteredBox>
        )}
      >
        <LoadingBoundary
          fallback={
            <CenteredBox sx={{ mt: 2 }}>
              <CircularProgress />
            </CenteredBox>
          }
        >
          <UserLogsTable search={search} />
        </LoadingBoundary>
      </ErrorBoundary>
    </Box>
  );
};

export default UserLogs;
