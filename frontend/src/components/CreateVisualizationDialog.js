import { createElement, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import Visualizations from "./Visualizations";

const CreateVisualizationDialog = (props) => {
  const [editor, setEditor] = useState();
  const [visualization, setVisualization] = useState();

  const handleBack = () => {
    setEditor();
  };

  const handleSelect = () => {
    setEditor(
      createElement(visualization.editor, {
        onBack: handleBack,
        ...props,
      })
    );
  };

  const handleChangeVisualization = (event, visualization) => {
    setVisualization(visualization);
  };

  return (
    <Dialog open onClose={props.onClose}>
      {editor || (
        <>
          <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
            New Visualization
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DialogContentText sx={{ mb: 2 }}>
              You can visualize the data collected by your IoT devices by
              picking a unique visualization from the list below.
            </DialogContentText>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <ToggleButtonGroup
                fullWidth
                color="primary"
                value={visualization}
                exclusive
                onChange={handleChangeVisualization}
                sx={{ mr: 1 }}
              >
                {Object.values(Visualizations).map((visualization) => (
                  <ToggleButton
                    key={visualization.name}
                    value={visualization}
                    sx={{ p: 3, display: "flex", flexDirection: "column" }}
                  >
                    {createElement(visualization.icon, { sx: { mb: 1 } })}
                    {visualization.name}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </DialogContent>
          <DialogActions sx={{ pb: 3, pr: 3 }}>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button
              variant="contained"
              disableElevation
              autoFocus
              disabled={!visualization}
              onClick={handleSelect}
            >
              Select
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CreateVisualizationDialog;
