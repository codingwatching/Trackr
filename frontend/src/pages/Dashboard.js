import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CreateProjectButton from "../components/CreateProjectButton";
import RecentProjectsList from "../components/RecentProjectsList";
import UsageList from "../components/UsageList";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 3, pb: 4 }}>
      <Box
        sx={{
          display: "flex",

          borderRadius: 1,
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
          alignItems: {
            xs: "center",
            sm: "center",
            md: "start",
          },
          py: 4,
          mb: 2,
        }}
      >
        <AutoAwesomeTwoToneIcon
          sx={{
            fontSize: 130,
            color: "#3887ffc4",
            mb: {
              sm: 5,
              xs: 5,
              md: 0,
            },
          }}
        />
        <Box
          sx={{
            ml: {
              sm: 0,
              xs: 0,
              md: 5,
            },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 22 }}>
            Welcome to trackr! Let's get started
          </Typography>

          <Typography variant="h7" sx={{ mb: 3 }}>
            Get started building your personal projects, testing out ideas, and
            more in your workspace.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "initial" }}>
            <CreateProjectButton sx={{ fontSize: 13, mr: 1 }} />

            <Button
              variant="contained"
              disableElevation
              sx={{
                fontSize: 13,
                background: "#eaecf0",
                color: "black",
                "&:hover": { background: "#d5d7db" },
              }}
              onClick={() => navigate("/projects")}
            >
              View all projects
            </Button>
          </Box>
        </Box>
      </Box>

      <UsageList />
      <RecentProjectsList />
    </Container>
  );
};

export default Dashboard;
