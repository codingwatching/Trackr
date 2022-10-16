import { createElement, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Visualizations from "./Visualizations";

const CreateVisualizationDialog = (props) => {
  const [editor, setEditor] = useState();

  const handleBack = () => {
    setEditor();
  };

  const handleSelectDialog = (visualization) => {
    setEditor(
      createElement(visualization.editor, {
        onBack: handleBack,
        ...props,
      })
    );
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
                mb: 1,
              }}
            >
              {Object.values(Visualizations).map((visualization) => (
                <ButtonBase
                  key={visualization.name}
                  onClick={() => handleSelectDialog(visualization)}
                  sx={{
                    "&:hover": {
                      background: "hsl(216deg 50% 91%)",
                    },
                    flex: 1,
                    py: 5,

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                    borderRadius: 2,
                    backgroundColor: visualization.color,
                    boxShadow: "0px 2px 3px -1px rgb(157 157 157 / 56%)",
                  }}
                >
                  {createElement(visualization.icon, { sx: { mb: 1 } })}

                  <Typography variant="button">{visualization.name}</Typography>
                </ButtonBase>
              ))}
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default CreateVisualizationDialog;
