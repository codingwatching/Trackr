import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CenteredBox from "../components/CenteredBox";
import ErrorIcon from "@mui/icons-material/Error";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";

const RecentProjectsList = () => {
  const [projects, , loading, error] = useProjects();
  const navigate = useNavigate();

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ flexGrow: 1, pb: 2, borderBottom: "2px solid #f4f5f7", mb: 3 }}
      >
        Recent projects
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        {projects.map((project) => (
          <Box
            key={project.id}
            sx={{
              display: "flex",
              overflow: "hidden",
              flexDirection: "row",
              width: "250px",
              borderRadius: 1,
              background: "#f4f5f7",
              boxShadow:
                "var(--ds-shadow-raised,0 1px 1px rgba(9,30,66,0.25),0 0 1px 1px rgba(9,30,66,0.13))",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                background: "white",
                mt: 5,
                px: 2,
                pb: 2,
                flex: 1,
              }}
            >
              <AccountTreeRoundedIcon
                sx={{
                  fontSize: 35,
                  color: "#3887ff",
                  backgroundColor: "#bed8ff",
                  borderRadius: 1,
                  mt: "-20px",
                  mb: 1,
                }}
              />

              <Typography variant="h6" sx={{ fontSize: "18px" }}>
                {project.name}
              </Typography>
              <Typography
                variant="h7"
                sx={{ fontSize: "15px", color: "#484848" }}
              >
                {project.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecentProjectsList;
