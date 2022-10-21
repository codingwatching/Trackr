import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import CreateVisualizationDialog from "./CreateVisualizationDialog";

const CreateVisualizationButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <ButtonBase
        onClick={handleOpenDialog}
        sx={{
          "&:hover": {
            background: "hsl(216deg 50% 91%)",
          },
          display: "flex",
          flexDirection: "column",
          p: 9,
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
          borderRadius: 2,
          backgroundColor: "#f0f4fa",
          boxShadow: "0px 2px 3px -1px rgb(157 157 157 / 56%)",
        }}
      >
        <AddRoundedIcon sx={{ fontSize: 30, mb: 1 }} />
        <Typography variant="button">Add Visualization</Typography>
      </ButtonBase>

      {dialogOpen && <CreateVisualizationDialog onClose={handleCloseDialog} />}
    </>
  );
};

export default CreateVisualizationButton;
