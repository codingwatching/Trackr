import { useProject } from "../contexts/ProjectContext";
import { useParams, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import CenteredBox from "../components/CenteredBox";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";

const EditProject = () => {
  const { projectId } = useParams();
  const [project, setProject, loading, error] = useProject(projectId);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
    <>
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
        <Paper sx={{ p: 3, mb: 2 }}>
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
            <TextField label="Name" required defaultValue={project.name} />
            <Typography variant="caption" sx={{ mt: 1, mb: 2.5 }}>
              This is the name of the project that everyone will see.
            </Typography>

            <TextField
              label="Description"
              required
              multiline
              rows={4}
              defaultValue={project.description}
            />
            <Typography variant="caption" sx={{ mt: 1, mb: 3 }}>
              This is the description used to briefly describe your project.
            </Typography>

            <TextField disabled label="API Key" defaultValue={project.apiKey} />
            <Typography variant="caption" sx={{ mt: 1, mb: 3 }}>
              This is the secret key used by your IoT devices to communciate
              with the platform.
            </Typography>
            <Divider />

            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
              disableElevation
              sx={{ mt: 2, maxWidth: 200, textTransform: "none" }}
            >
              Save Changes
            </LoadingButton>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default EditProject;
