import { createVisualizationElement } from "../components/visualizations/Visualizations";
import { Fragment } from "react";
import CreateVisualizationDialog from "../components/CreateVisualizationButton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Project = (props) => {
  return (
    <Container sx={{ my: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
      {props.visualizations.map((visualization) => (
        <Fragment key={visualization.id}>
          {createVisualizationElement(visualization, props)}
        </Fragment>
      ))}
      <CreateVisualizationDialog {...props} />
    </Container>
  );
};

export default Project;
