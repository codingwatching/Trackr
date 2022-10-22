import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useContext } from "react";
import { createVisualizationElement } from "../components/visualizations/Visualizations";
import CreateVisualizationButton from "../components/CreateVisualizationButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CenteredBox from "../components/CenteredBox";

const Project = () => {
  const { visualizations } = useContext(ProjectRouteContext);

  return (
    <Container sx={{ mt: 2.5 }}>
      {visualizations.length ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 2,
            }}
          >
            <CreateVisualizationButton />
          </Box>
          <Box sx={{ pb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
            {visualizations.map((visualization) => (
              <Paper
                key={visualization.id}
                sx={{
                  p: 2,
                  flexGrow: 1,
                  display: "flex",
                  minHeight: "420px",
                  flexDirection: "column",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "black",
                  boxShadow: "none",
                  border: "1px solid #0000001f",
                }}
              >
                {createVisualizationElement(visualization)}
              </Paper>
            ))}
          </Box>
        </>
      ) : (
        <CenteredBox sx={{ color: "gray" }}>
          <NightsStayOutlinedIcon sx={{ fontSize: 100, mt: 10, mb: 3 }} />
          <Typography variant="h5" sx={{ userSelect: "none", mb: 2 }}>
            You currently have no visualizations.
          </Typography>

          <CreateVisualizationButton variant={"contained"} />
        </CenteredBox>
      )}
    </Container>
  );
};

export default Project;
