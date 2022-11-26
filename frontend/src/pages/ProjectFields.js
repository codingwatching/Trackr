import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useFields } from "../hooks/useFields";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CenteredBox from "../components/CenteredBox";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import ErrorIcon from "@mui/icons-material/Error";
import Tooltip from "@mui/material/Tooltip";
import Moment from "react-moment";
import CreateFieldButton from "../components/CreateFieldButton";
import FieldMenuButton from "../components/FieldMenuButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const ProjectFields = () => {
  const { project } = useContext(ProjectRouteContext);
  const [fields, setFields, loading, error] = useFields(project.id);
  const [search, setSearch] = useState("");

  if (loading) {
    return (
      <CenteredBox>
        <CircularProgress />
      </CenteredBox>
    );
  }

  if (error) {
    return (
      <CenteredBox>
        <ErrorIcon sx={{ fontSize: 100, mb: 3 }} />
        <Typography
          variant="h5"
          sx={{ mb: 10, userSelect: "none", textAlign: "center" }}
        >
          {error}
        </Typography>
      </CenteredBox>
    );
  }
  return (
    <Container sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Fields
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
          sx={{ mr: 1, color: "blue" }}
          size="small"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CreateFieldButton
          sx={{
            fontSize: 13,
            background: "#eaecf0",
            color: "black",
            "&:hover": { background: "#d5d7db" },
          }}
        />
      </Box>

      {fields.length ? (
        <Table sx={{ border: "1px solid #e0e0e0", mb: 2 }}>
          <TableHead sx={{ background: "#f6f8fa" }}>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Created</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields
              .filter((field) =>
                field.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((field) => (
                <TableRow
                  key={field.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left"> 
                      {field.id}
                  </TableCell>
                  <TableCell align="left"> 
                      {field.name}
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title={field.createdAt}>
                      <Box>
                        <Moment fromNow ago>
                          {field.createdAt}
                        </Moment>{" "}
                        ago
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                   <FieldMenuButton
                      field={field}
                      fields={fields}
                      setFields={setFields}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 15,
          }}
        >
          <NightsStayIcon sx={{ fontSize: 100, mt: 10, mb: 3 }} />
          <Typography
            variant="h5"
            sx={{ userSelect: "none", mb: 2, textAlign: "center" }}
          >
            You currently have no fields.
          </Typography>
        </Box>
      )}
    
    </Container>
  );
};

export default ProjectFields;
