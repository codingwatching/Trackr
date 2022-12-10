import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CenteredBox from "./CenteredBox";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import TextButton from "./TextButton";

const RecentProjectsSubList = () => {
  const [projects] = useProjects();
  const navigate = useNavigate();

  return projects.length === 0 ? (
    <CenteredBox>
      <Typography variant="h7" sx={{ color: "gray" }}>
        You currently have no projects.
      </Typography>
    </CenteredBox>
  ) : (
    projects.map((project) => (
      <Box
        key={project.id}
        sx={{
          display: "flex",
          flexDirection: "row",
          minWidth: {
            xs: "100%",
            sm: "49%",
            md: "23%",
          },
          maxWidth: {
            xs: "unset",
            sm: "unset",
            md: "200px",
          },
          flex: 1,
          borderRadius: 1,
          background: "#ebf3ff",
          boxShadow: "0 1px 1px 1px rgb(9 30 66 / 10%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            mt: 5,
            px: 2,
            pb: 3,
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

          <TextButton onClick={() => navigate("/projects/" + project.id)}>
            <Typography variant="h6" sx={{ fontSize: "18px" }}>
              {project.name}
            </Typography>
          </TextButton>

          <Typography
            variant="h7"
            sx={{
              fontSize: "13px",
              mt: 1,
              color: "#999999",
              userSelect: "none",
            }}
          >
            QUICK LINKS
          </Typography>

          <TextButton
            onClick={() => navigate("/projects/fields/" + project.id)}
          >
            <Typography variant="h7" sx={{ fontSize: "13px", flex: 1 }}>
              Fields
            </Typography>

            <Typography
              variant="h7"
              sx={{
                fontSize: "13px",
                background: "#00000011",
                px: 1,
                borderRadius: 100,
              }}
            >
              {project.numberOfFields}
            </Typography>
          </TextButton>

          <TextButton onClick={() => navigate("/projects/api/" + project.id)}>
            <Typography variant="h7" sx={{ fontSize: "13px", flex: 1 }}>
              API
            </Typography>
          </TextButton>

          <TextButton
            onClick={() => navigate("/projects/settings/" + project.id)}
          >
            <Typography variant="h7" sx={{ fontSize: "13px", flex: 1 }}>
              Settings
            </Typography>
          </TextButton>
        </Box>
      </Box>
    ))
  );
};

export default RecentProjectsSubList;
