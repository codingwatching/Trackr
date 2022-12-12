import { useUpdateProject } from "../hooks/useUpdateProject";
import { useProject } from "../hooks/useProject";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Moment from "react-moment";
import formatError from "../utils/formatError";

const EditProject = () => {
  const { projectId } = useParams();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const project = useProject(projectId);
  const [updateProject, updateProjectContext] = useUpdateProject();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    updateProject({
      id: project.id,
      name: data.get("name"),
      description: data.get("description"),
      resetAPIKey: false,
    })
      .then(() => {
        setSuccess("Project settings updated successfully.");
        setError();
      })
      .catch((error) => {
        setError(formatError(error));
      });
  };

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
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          Settings
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 3, display: "flex", flexDirection: "column" }}
      >
        {(error || success) && (
          <Fade in={error || success ? true : false}>
            <Alert
              severity={error ? "error" : "success"}
              sx={{ mb: 3, mt: -1 }}
            >
              {error || success}
            </Alert>
          </Fade>
        )}

        <TextField
          label="Name"
          name="name"
          error={error ? true : false}
          required
          defaultValue={project.name}
        />
        <Typography variant="caption" sx={{ mt: 1, mb: 2.5, color: "gray" }}>
          The name of your project used to identify it.
        </Typography>

        <TextField
          label="Description"
          name="description"
          required
          error={error ? true : false}
          multiline
          rows={4}
          defaultValue={project.description}
        />
        <Typography variant="caption" sx={{ mt: 1, mb: 2.5, color: "gray" }}>
          The description used to briefly describe your project.
        </Typography>

        <Divider />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <LoadingButton
            loading={updateProjectContext.isLoading}
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              my: 2,
              mr: 1.5,
              maxWidth: 180,
              flexGrow: 1,
            }}
          >
            Save Changes
          </LoadingButton>

          <Typography
            variant="caption"
            sx={{
              mt: 1,
              mb: 3,
            }}
          >
            Last modified{" "}
            <Moment fromNow ago>
              {project.updatedAt}
            </Moment>{" "}
            ago
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProject;
