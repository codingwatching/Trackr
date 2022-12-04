import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import CenteredBox from "../components/CenteredBox";
import Tooltip from "@mui/material/Tooltip";
import Moment from "react-moment";
import CreateFieldButton from "../components/CreateFieldButton";
import FieldMenuButton from "../components/FieldMenuButton";
import SearchBar from "../components/SearchBar";

const ProjectFields = () => {
  const { fields } = useContext(ProjectRouteContext);
  const [search, setSearch] = useState("");

  return (
    <Container sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mb: 2,
        }}
      >
        <SearchBar
          title="Fields"
          search={search}
          setSearch={setSearch}
          element={
            <CreateFieldButton
              variant={"contained"}
              sx={{
                fontSize: 13,
                background: "#eaecf0",
                color: "black",
                "&:hover": { background: "#d5d7db" },
              }}
            />
          }
        />
      </Box>

      <TableContainer
        sx={{ border: "1px solid #e0e0e0", mb: 2, borderRadius: 1 }}
        component={Box}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Values</TableCell>
              <TableCell align="left">Created</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          {fields.length > 0 && (
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
                    <TableCell align="left">{field.id}</TableCell>
                    <TableCell align="left">{field.name}</TableCell>
                    <TableCell align="left">
                      {field.numberOfValues.toLocaleString()}
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
                      <FieldMenuButton field={field} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>

        {fields.length === 0 && (
          <CenteredBox sx={{ py: 5 }}>
            <Typography variant="h7" sx={{ color: "gray" }}>
              You currently have no fields.
            </Typography>
          </CenteredBox>
        )}
      </TableContainer>
    </Container>
  );
};

export default ProjectFields;
