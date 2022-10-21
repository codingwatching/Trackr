import { ProjectRouteContext } from "../routes/ProjectRoute";
import { useContext } from "react";
import { createVisualizationElement } from "../components/visualizations/Visualizations";
import CreateVisualizationDialog from "../components/CreateVisualizationButton";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const Project = () => {
  const { visualizations } = useContext(ProjectRouteContext);

  return (
    <Container sx={{ my: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
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

      <CreateVisualizationDialog />
    </Container>
  );
};

export default Project;
