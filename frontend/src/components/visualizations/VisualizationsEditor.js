import { ProjectRouteContext } from "../../routes/ProjectRoute";
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
import VisualizationsAPI from "../../api/VisualizationsAPI";

const VisualizationsEditor = ({
  onBack,
  onClose,
  onAddField,

  visualizationType,

  visualization,
  metadata,
}) => {
  const { fields, visualizations, setVisualizations } =
    useContext(ProjectRouteContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [fieldId, setFieldId] = useState(visualization?.fieldId || "");
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

    if (visualization) {
      VisualizationsAPI.updateVisualization(visualization.id, fieldId, metadata)
        .then(() => {
          setVisualizations(
            visualizations.map((v) =>
              v === visualization
                ? {
                    id: visualization.id,
                    fieldId: fieldId,
                    fieldName: fields.find((field) => field.id === fieldId)
                      .name,
                    metadata: metadata,
                    createdAt: visualization.createdAt,
                    updatedAt: new Date(),
                  }
                : v
            )
          );

          setLoading(false);
          onClose();
        })
        .catch((error) => {
          setLoading(false);

          if (error?.response?.data?.error) {
            setError(error.response.data.error);
          } else {
            setError("Failed to update visualization: " + error.message);
          }
        });
    } else {
      VisualizationsAPI.addVisualization(fieldId, metadata)
        .then((result) => {
          setVisualizations([
            ...visualizations,
            {
              id: result.data.id,
              fieldId: fieldId,
              fieldName: fields.find((field) => field.id === fieldId).name,
              metadata: metadata,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);

          setLoading(false);
          onClose();
        })
        .catch((error) => {
          setLoading(false);

          if (error?.response?.data?.error) {
            setError(error.response.data.error);
          } else {
            setError("Failed to add visualization: " + error.message);
          }
        });
    }

    setLoading(true);
  };

  return (
    <>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {onBack && (
          <IconButton
            color="primary"
            sx={{ mr: 1 }}
            disabled={loading}
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
          Select a field you wish to display in a{" "}
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
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          disableElevation
          autoFocus
          loading={loading}
          onClick={handleSubmit}
        >
          {onBack ? "Create" : "Save"}
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default VisualizationsEditor;
