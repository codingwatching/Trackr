import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
import CreateFieldDialog from "./CreateFieldDialog";

const CreateFieldButton = ({ variant }) => {
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
        New Field
      </Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <CreateFieldDialog onClose={handleCloseDialog} onBack={handleCloseDialog} />
      </Dialog>
    </>
  );
};

export default CreateFieldButton;