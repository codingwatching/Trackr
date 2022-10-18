import { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Table from "./Table";
import FieldListMenu from "../FieldListMenu";
import VisualizationsAPI from "../../api/VisualizationsAPI";

const TableEditor = ({
  onBack,
  onClose,
  onAddField,

  project,
  fields,
  visualization,
  visualizations,
  setVisualizations,
}) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(
    visualization ? visualization.metadata.sort : ""
  );
  const [field, setField] = useState(
    visualization ? visualization.metadata.field : ""
  );

  const handleChangeSort = (event, newSort) => {
    setSort(newSort);
  };

  const handleChangeField = (event) => {
    setField(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!field) {
      setError("You must select a field.");
      return;
    }

    if (!sort) {
      setError("You must select a sorting order.");
      return;
    }

    const metadata = Table.serialize(field, sort);

    if (visualization) {
      throw "unimplemented";

      // VisualizationsAPI.updateVisualization(visualization.id, metadata)
      //   .then((result) => {
      //     visualizations.push({
      //       id: result.data.id,
      //       metadata: metadata,
      //     });

      //     setVisualizations(visualizations);
      //     setLoading(false);
      //     onClose();
      //   })
      //   .catch((error) => {
      //     setLoading(false);

      //     if (error?.response?.data?.error) {
      //       setError(error.response.data.error);
      //     } else {
      //       setError("Failed to update visualization: " + error.message);
      //     }
      //   });
    } else {
      VisualizationsAPI.addVisualization(project.id, metadata)
        .then((result) => {
          setVisualizations([
            ...visualizations,
            {
              id: result.data.id,
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
        {!visualization && (
          <IconButton
            color="primary"
            sx={{ mr: 1 }}
            disabled={loading}
            onClick={onBack}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        New Table
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
          A table allows you to display the data corresponding to a field in a
          sorted and contiguous manner. Select a field you wish to display in a
          table format.
        </DialogContentText>

        <FieldListMenu
          field={field}
          fields={fields}
          onChange={handleChangeField}
          onAddField={onAddField}
        />

        <DialogContentText sx={{ mb: 2 }}>
          Select whether you want to display the latest data (descending) or the
          oldest data (ascending) first in the table.
        </DialogContentText>
        <ToggleButtonGroup
          fullWidth
          color="primary"
          value={sort}
          exclusive
          onChange={handleChangeSort}
          sx={{ mr: 1 }}
        >
          <ToggleButton value={"desc"} sx={{ p: 3 }}>
            <ArrowDownwardIcon sx={{ mr: 1 }} />
            Descending
          </ToggleButton>
          <ToggleButton value={"asc"}>
            <ArrowUpwardIcon sx={{ mr: 1 }} />
            Ascending
          </ToggleButton>
        </ToggleButtonGroup>
      </DialogContent>
      <DialogActions sx={{ pb: 3, pr: 3 }}>
        {!visualization && (
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        )}
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
export default TableEditor;
