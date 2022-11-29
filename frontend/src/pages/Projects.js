import { useProjects } from "../hooks/useProjects";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Link from "@mui/material/Link";
import CenteredBox from "../components/CenteredBox";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import ErrorIcon from "@mui/icons-material/Error";
import Tooltip from "@mui/material/Tooltip";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import Moment from "react-moment";
import CreateProjectButton from "../components/CreateProjectButton";
import ProjectMenuButton from "../components/ProjectMenuButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const Projects = () => {
  const [projects, setProjects, loading, error] = useProjects();
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
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          Projects
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

        <CreateProjectButton
          icon
          sx={{
            fontSize: 13,
            background: "#eaecf0",
            color: "black",
            "&:hover": { background: "#d5d7db" },
          }}
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      {projects.length ? (
        <TableContainer
          sx={{ border: "1px solid #e0e0e0", mb: 2, borderRadius: 1 }}
          component={Box}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Created</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects
                .filter((project) =>
                  project.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((project) => (
                  <TableRow
                    key={project.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <Link
                        component={NavLink}
                        to={"/projects/" + project.id}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <AccountTreeRoundedIcon sx={{ mr: 3 }} />
                        {project.name}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title={project.createdAt}>
                        <Box>
                          <Moment fromNow ago>
                            {project.createdAt}
                          </Moment>{" "}
                          ago
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <ProjectMenuButton
                        project={project}
                        projects={projects}
                        setProjects={setProjects}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            You currently have no projects.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Projects;
