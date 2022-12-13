import { ProjectRouteContext } from "../../routes/ProjectRoute";
import { useFields } from "../../hooks/useFields";
import { useUpdateVisualization } from "../../hooks/useUpdateVisualization";
import { useCreateVisualization } from "../../hooks/useCreateVisualization";
import { createElement, useContext, useState, useRef } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FieldListMenu from "../FieldListMenu";
import formatError from "../../utils/formatError";

const VisualizationsEditor = ({
  onBack,
  onClose,
  onAddField,

  visualizationType,
  visualization,
  metadata,
}) => {
  const projectId = useContext(ProjectRouteContext);
  const fields = useFields(projectId);

  const [fieldId, setFieldId] = useState(visualization?.fieldId || "");
  const [error, setError] = useState();
  const [createVisualization, createVisualizationContext] =
    useCreateVisualization(projectId);
  const [updateVisualization, updateVisualizationContext] =
    useUpdateVisualization(projectId);

  const editorRef = useRef();

  const handleChangeField = (event) => {
    setFieldId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fieldId) {
      setError("You must select a field.");
      return;
    }

    const metadata = editorRef.current.submit();
    if (!metadata) {
      return;
    }

    const fieldName = fields.find((field) => field.id === fieldId).name;

    if (visualization) {
      updateVisualization({
        id: visualization.id,
        fieldId,
        fieldName,
        metadata,
      })
        .then(onClose)
        .catch((error) => setError(formatError(error)));
    } else {
      createVisualization({ fieldId, metadata })
        .then(onClose)
        .catch((error) => setError(formatError(error)));
    }
  };

  return (
    <>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {onBack && (
          <IconButton
            color="primary"
            sx={{ mr: 1 }}
            disabled={
              createVisualizationContext.isLoading ||
              updateVisualizationContext.isLoading
            }
            onClick={onBack}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        {onBack ? "New" : "Edit"} {visualizationType.name}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 1 }}>
              {error}
            </Alert>
          </Fade>
        )}

        <DialogContentText sx={{ mb: 2 }}>
          Select a field whose data you wish to display in a{" "}
          {visualizationType.name.toLowerCase()}.
        </DialogContentText>

        <FieldListMenu
          onChange={handleChangeField}
          onAddField={onAddField}
          selectedFieldId={fieldId}
        />

        {createElement(
          visualizationType.editor,
          {
            ref: editorRef,
            metadata,
            setError,
          },
          {}
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <Button
          onClick={onClose}
          disabled={
            createVisualizationContext.isLoading ||
            updateVisualizationContext.isLoading
          }
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          disableElevation
          autoFocus
          loading={
            createVisualizationContext.isLoading ||
            updateVisualizationContext.isLoading
          }
          onClick={handleSubmit}
        >
          {onBack ? "Create" : "Save"}
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default VisualizationsEditor;
