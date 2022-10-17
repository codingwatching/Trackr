import { useFields } from "../../contexts/FieldsContext";
import { useVisualizations } from "../../contexts/VisualizationsContext";
import { cloneElement } from "react";
import CenteredBox from "../CenteredBox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

const VisualizationsAndFieldsRoute = ({ element, project, setProject }) => {
  const [fields, setFields, loadingFields, errorFields] = useFields(project.id);
  const [
    visualizations,
    setVisualizations,
    loadingVisualizations,
    errorVisualizations,
  ] = useVisualizations(project.id);

  if (errorFields || errorVisualizations) {
    return (
      <CenteredBox>
        <ErrorIcon sx={{ fontSize: 100, mb: 3 }} />
        <Typography variant="h5" sx={{ mb: 10, userSelect: "none" }}>
          {errorFields || errorVisualizations}
        </Typography>
      </CenteredBox>
    );
  }

  return (
    <>
      {loadingFields || loadingVisualizations ? (
        <CenteredBox>
          <CircularProgress />
          <Typography variant="button" sx={{ mt: 3, color: "gray" }}>
            Loading Fields & Visualizations
          </Typography>
        </CenteredBox>
      ) : (
        cloneElement(element, {
          project,
          setProject,
          fields,
          setFields,
          visualizations,
          setVisualizations,
        })
      )}
    </>
  );
};

export default VisualizationsAndFieldsRoute;
