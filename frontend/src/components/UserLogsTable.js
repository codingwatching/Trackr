import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useLogs } from "../hooks/useLogs";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

const UserLogsTable = ({ search }) => {
  const navigate = useNavigate();
  const user = useUser();
  const logs = useLogs();
  const [offset, setOffset] = useState(0);

  const limit = 20;
  const filteredLogs = useMemo(
    () =>
      logs.filter(
        (log) =>
          log.message.toLowerCase().includes(search.toLowerCase()) ||
          log.projectName.toLowerCase().includes(search.toLowerCase()) ||
          log.createdAt.toLowerCase().includes(search.toLowerCase())
      ),
    [logs, search]
  );

  const splicedLogs = useMemo(
    () => filteredLogs.slice(offset, offset + limit),
    [filteredLogs, offset, limit]
  );

  useEffect(() => {
    setOffset(0);

    return () => {};
  }, [search]);

  const handleNextPage = () => {
    setOffset(offset + splicedLogs.length);
  };

  const handlePreviousPage = () => {
    setOffset(offset - limit);
  };

  return (
    <>
      <TableContainer
        sx={{
          border: "1px solid #e0e0e0",
          mb: 2,
          borderRadius: 1,
        }}
        component={Box}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Recent events</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {splicedLogs.map((log, index) => (
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
                  <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ fontWeight: "bold" }}>
                        {user.firstName} {user.lastName}
                        {log.projectName && (
                          <>
                            {" "}
                            &mdash;{" "}
                            <Link
                              href={"/projects/" + log.projectId}
                              onClick={(e) => {
                                e.preventDefault();
                                navigate("/projects/" + log.projectId);
                              }}
                            >
                              {log.projectName}
                            </Link>
                          </>
                        )}
                      </Box>
                      <Box>{log.message}</Box>
                    </Box>

                    <Tooltip title={log.createdAt}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "gray",
                        }}
                      >
                        {moment(log.createdAt).fromNow()}
                      </Box>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          mb: 3,
        }}
      >
        <Button
          sx={{ px: 2 }}
          onClick={handlePreviousPage}
          disabled={offset - limit < 0}
        >
          Newer
        </Button>
        <Button
          sx={{ px: 2 }}
          onClick={handleNextPage}
          disabled={offset + limit >= filteredLogs.length}
        >
          Older
        </Button>
      </Box>
    </>
  );
};

export default UserLogsTable;
