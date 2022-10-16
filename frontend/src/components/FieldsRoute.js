import { useFields } from "../contexts/FieldsContext";
import { cloneElement } from "react";
import CenteredBox from "./CenteredBox";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

const FieldsRoute = ({ element, project, setProject }) => {
  const [fields, setFields, loading, error] = useFields(project.id);

  if (error) {
    return (
      <CenteredBox>
        <ErrorIcon sx={{ fontSize: 100, mb: 3 }} />
        <Typography variant="h5" sx={{ mb: 10, userSelect: "none" }}>
          {error}
        </Typography>
      </CenteredBox>
    );
  }

  return (
    <>
      {loading ? (
        <CenteredBox>
          <CircularProgress />
          <Typography variant="button" sx={{ mt: 3, color: "gray" }}>
            Loading Fields
          </Typography>
        </CenteredBox>
      ) : (
        cloneElement(element, { project, setProject, fields, setFields })
      )}
    </>
  );
};

export default FieldsRoute;
