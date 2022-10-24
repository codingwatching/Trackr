import { useState, useContext } from "react";
import { ProjectRouteContext } from "../routes/ProjectRoute";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import ProjectsAPI from "../api/ProjectsAPI";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Moment from "react-moment";

const EditProject = () => {
  const { project, setProject } = useContext(ProjectRouteContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [alignment, setAlignment] = useState();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    ProjectsAPI.updateProject(
      project.id,
      data.get("name"),
      data.get("description"),
      alignment ? true : false
    )
      .then((result) => {
        setProject({
          ...project,
          name: data.get("name"),
          description: data.get("description"),
          apiKey: result.data.apiKey,
          updatedAt: new Date(),
        });

        setLoading(false);
        setSuccess("Project settings updated successfully.");
        setError();
        setAlignment();
      })
      .catch((error) => {
        setLoading(false);
        setSuccess();

        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to update project settings: " + error.message);
        }
      });

    setLoading(true);
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
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Settings
        </Typography>
      </Box>

      <Divider />

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
        <Typography variant="caption" sx={{ mt: 1, mb: 2.5 }}>
          The name of your project used to identify it.
        </Typography>

        <TextField
          label="Description"
          name="description"
          required
          multiline
          rows={4}
          defaultValue={project.description}
        />
        <Typography variant="caption" sx={{ mt: 1, mb: 2.5 }}>
          The description used to briefly describe your project.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            sx={{ mr: 1 }}
          >
            <ToggleButton value={true}>
              <ChangeCircleIcon sx={{ mr: 1 }} />
              Reset API Key
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Typography variant="caption" sx={{ mt: 1, mb: 3 }}>
          You can reset the secret key used by your IoT devices to communciate
          with your project.
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
            loading={loading}
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
