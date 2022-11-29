import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useContext } from "react";
import OpenAPI from "../components/openapi/OpenAPI";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";

const apiPath = "http://localhost:8080/api/values";

const ProjectAPI = () => {
  const { project } = useContext(ProjectRouteContext);

  return (
    <Container sx={{ mt: 3, pb: 3 }}>
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
        The trackr API enables you to write data to a field in a project of your
        choice. The API can be called just with any HTTP Client, like Postman,
        Insomnia, or even right here in the browser.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            width: "fit-content",
            p: 2,
            mt: 1.5,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {project.apiKey}
        </Box>

        <Typography variant="caption" sx={{ mt: 1, mb: 1.5, color: "gray" }}>
          Your API key is auto-generated when you create a new project. If you
          feel your key has been compromised, click <b>Reset API Key</b> to
          reset your API key.
        </Typography>
      </Box>
      <LoadingButton variant="outlined" disableElevation>
        Reset API Key
      </LoadingButton>
      <Divider sx={{ my: 3 }} />
      <OpenAPI />
    </Container>
  );
};

export default ProjectAPI;
