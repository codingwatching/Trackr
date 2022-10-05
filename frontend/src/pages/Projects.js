import { useProjects } from "../contexts/ProjectsContext";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import CenteredBox from "../components/CenteredBox";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import Moment from "react-moment";
import CreateProjectButton from "../components/CreateProjectButton";
import EditProjectButton from "../components/EditProjectButton";

const Projects = () => {
  const [projects, setProjects, loading, error] = useProjects();

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
        <Typography variant="h5" sx={{ mb: 10, userSelect: "none" }}>
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
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Projects
        </Typography>
        <CreateProjectButton />
      </Box>

      <Divider />

      {projects.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Created</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
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
                  <EditProjectButton
                    project={project}
                    projects={projects}
                    setProjects={setProjects}
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
            color: "darkgray",
          }}
        >
          <NightsStayOutlinedIcon sx={{ fontSize: 100, mt: 10, mb: 3 }} />
          <Typography variant="h5" sx={{ mb: 10, userSelect: "none" }}>
            You currently have no projects.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Projects;
