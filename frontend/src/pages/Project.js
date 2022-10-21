import { ProjectRouteContext } from "../routes/ProjectRoute";
import { Fragment, useContext } from "react";
import { createVisualizationElement } from "../components/visualizations/Visualizations";
import CreateVisualizationDialog from "../components/CreateVisualizationButton";
import Container from "@mui/material/Container";

const Project = () => {
  const { visualizations } = useContext(ProjectRouteContext);

  return (
    <Container sx={{ my: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
      {visualizations.map((visualization) => (
        <Fragment key={visualization.id}>
          {createVisualizationElement(visualization)}
        </Fragment>
      ))}

      <CreateVisualizationDialog />
    </Container>
  );
};

export default Project;
