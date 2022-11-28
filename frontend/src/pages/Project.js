import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useContext } from "react";
import { createVisualizationElement } from "../components/visualizations/Visualizations";
import CreateVisualizationButton from "../components/CreateVisualizationButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NightsStayIcon from "@mui/icons-material/NightsStay";
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
          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {visualizations.map((visualization) => (
              <Paper
                key={visualization.id}
                sx={{
                  p: 2,
                  display: "flex",
                  flex: 1,
                  height: "480px",
                  minWidth: {
                    xs: "100%",
                    sm: "100%",
                    md: "550px",
                  },
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
        <CenteredBox sx={{ mb: 15 }}>
          <NightsStayIcon sx={{ fontSize: 100, mt: 10, mb: 3 }} />
          <Typography
            variant="h5"
            sx={{ userSelect: "none", mb: 2, textAlign: "center" }}
          >
            You currently have no visualizations.
          </Typography>

          <CreateVisualizationButton variant={"contained"} />
        </CenteredBox>
      )}
    </Container>
  );
};

export default Project;
