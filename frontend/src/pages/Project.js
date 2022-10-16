import Container from "@mui/material/Container";
import CreateVisualizationDialog from "../components/CreateVisualizationButton";

const Project = (props) => {
  const { visualizations } = props;

  return (
    <Container sx={{ my: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
      {visualizations.map((visualization) => (
        <>hi</>
      ))}
      <CreateVisualizationDialog {...props} />
    </Container>
  );
};

export default Project;
