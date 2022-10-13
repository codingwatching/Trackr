import Container from "@mui/material/Container";
import AddVisualizationButton from "../components/AddVisualizationButton";

const Project = ({ project, setProject }) => {
  return (
    <Container sx={{ my: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
      <AddVisualizationButton project={project} setProject={setProject} />
    </Container>
  );
};

export default Project;
