import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const apiPath = "http://localhost:8080/api/values";

const ProjectAPI = () => {
  const { project } = useContext(ProjectRouteContext);

  return (
    <Container sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          API
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h7">
        The API enables you to write data to a field of your choice. You API key
        is auto-generated when you create a new project&mdash;you can reset your
        API key at any time.
      </Typography>

      <Box>
        <Box sx={{}}>{project.apiKey}</Box>
      </Box>
    </Container>
  );
};

export default ProjectAPI;
