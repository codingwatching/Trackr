import { useContext, useState } from "react";
import { useLogs } from "../hooks/useLogs";
import { UserSettingsRouteContext } from "../routes/UserSettingsRoute";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CenteredBox from "../components/CenteredBox";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import { Link } from "@mui/material";

const UserLogs = () => {
  const { user } = useContext(UserSettingsRouteContext);
  const [search, setSearch] = useState("");
  const [logs, loading, error] = useLogs();

  console.log(logs);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", px: 3 }}>
      <Typography variant="h5">Activity Logs</Typography>
      <Typography variant="h7" sx={{ mb: 2 }}>
        View your recent activity and access history.
      </Typography>

      {error ? (
        <CenteredBox sx={{ mt: 2 }}>
          <ErrorIcon sx={{ fontSize: 50, mb: 2 }} />
          <Typography
            variant="h7"
            sx={{ mb: 10, userSelect: "none", textAlign: "center" }}
          >
            {error}
          </Typography>
        </CenteredBox>
      ) : loading ? (
        <CenteredBox sx={{ mt: 2 }}>
          <CircularProgress />
        </CenteredBox>
      ) : (
        <>
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

          <Table sx={{ border: "1px solid #e0e0e0", mb: 2 }}>
            <TableHead sx={{ background: "#f6f8fa" }}>
              <TableRow>
                <TableCell align="left">Recent events</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs
                .filter(
                  (log) =>
                    log.message.toLowerCase().includes(search.toLowerCase()) ||
                    log.projectName.toLowerCase().includes(search.toLowerCase())
                )
                .map((log, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Avatar
                          sx={{
                            width: 33,
                            height: 33,

                            mr: 2,
                            background: "#b9b9b9",
                          }}
                        />
                        {log.projectName && (
                          <AccountTreeRoundedIcon
                            sx={{
                              position: "absolute",
                              marginTop: "-15px",
                              marginLeft: "14px",
                              fontSize: 23,
                              borderRadius: "100%",
                              p: "3px",
                              background: "#c6ddff",
                              mr: 2,
                              color: "primary.main",
                            }}
                          />
                        )}
                      </Box>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", flex: 1 }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ fontWeight: "bold" }}>
                            {user.firstName} {user.lastName}
                            {log.projectName && (
                              <>
                                {" "}
                                &mdash;{" "}
                                <Link href={"/projects/" + log.projectId}>
                                  {log.projectName}
                                </Link>
                              </>
                            )}
                          </Box>
                          <Box>{log.message}</Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "gray",
                          }}
                        >
                          {moment(log.createdAt).fromNow()}
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default UserLogs;
