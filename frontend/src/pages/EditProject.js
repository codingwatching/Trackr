import { useState } from "react";
import { useProject } from "../contexts/ProjectContext";
import { useParams, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CenteredBox from "../components/CenteredBox";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ProjectsAPI from "../api/ProjectsAPI";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const EditProject = () => {
  const { projectId } = useParams();
  const [project, setProject, loading, error] = useProject(projectId);
  const [loadingSaveChanges, setLoadingSaveChanges] = useState(false);
  const [errorSaveChanges, setErrorSaveChanges] = useState();
  const [successSaveChanges, setSuccessSaveChanges] = useState();
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
        project.name = data.get("name");
        project.description = data.get("description");
        project.apiKey = result.data.apiKey;

        setProject(project);
        setLoadingSaveChanges(false);
        setSuccessSaveChanges("Project settings updated successfully.");
        setErrorSaveChanges();
        setAlignment();
      })
      .catch((error) => {
        setLoadingSaveChanges(false);
        setSuccessSaveChanges();

        if (error?.response?.data?.error) {
          setErrorSaveChanges(error.response.data.error);
        } else {
          setErrorSaveChanges("Failed to sign in: " + error.message);
        }
      });

    setLoadingSaveChanges(true);
  };

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
    <Container sx={{ mt: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3, mt: 1 }}
      >
        <Link
          component={NavLink}
          to={"/projects"}
          underline="hover"
          key="1"
          color="inherit"
        >
          Projects
        </Link>
        <Link
          component={NavLink}
          to={"/projects/" + project.id}
          underline="hover"
          key="2"
          color="inherit"
        >
          {project.name}
        </Link>
        <Typography key="3" color="text.primary">
          Edit
        </Typography>
      </Breadcrumbs>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 2,
        }}
      >
        <AccountTreeRoundedIcon
          sx={{ fontSize: 27, mr: 2, color: "primary.main" }}
        />

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Edit Project
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 3, display: "flex", flexDirection: "column" }}
      >
        {(errorSaveChanges || successSaveChanges) && (
          <Fade in={errorSaveChanges || successSaveChanges ? true : false}>
            <Alert
              severity={errorSaveChanges ? "error" : "success"}
              sx={{ mb: 3 }}
            >
              {errorSaveChanges || successSaveChanges}
            </Alert>
          </Fade>
        )}

        <TextField
          label="Name"
          name="name"
          error={errorSaveChanges ? true : false}
          required
          autoFocus
          defaultValue={project.name}
        />
        <Typography variant="caption" sx={{ mt: 1, mb: 2.5 }}>
          This is the name of the project that everyone will see.
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
          This is the description used to briefly describe your project.
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
          <TextField
            disabled
            label="API Key"
            value={project.apiKey}
            sx={{
              flexGrow: 1,
              textDecoration: alignment ? "line-through" : "none",
              color: "gray",
            }}
          />
        </Box>

        <Typography variant="caption" sx={{ mt: 1, mb: 3 }}>
          This is the secret key used by your IoT devices to communciate with
          the platform.
        </Typography>

        <Divider />

        <LoadingButton
          loading={loadingSaveChanges}
          type="submit"
          variant="contained"
          disableElevation
          sx={{ my: 2, maxWidth: 200, textTransform: "none" }}
        >
          Save Changes
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default EditProject;
