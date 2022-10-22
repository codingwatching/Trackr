import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
import CreateVisualizationDialog from "./CreateVisualizationDialog";

const CreateVisualizationButton = ({ variant }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button
        variant={variant}
        onClick={handleOpenDialog}
        startIcon={<AddRoundedIcon />}
        disableElevation
      >
        New Visualization
      </Button>

      {dialogOpen && <CreateVisualizationDialog onClose={handleCloseDialog} />}
    </>
  );
};

export default CreateVisualizationButton;
