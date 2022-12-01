import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ResetAPIKeyDialog from "./ResetAPIKeyDialog";

const ResetAPIKeyButton = ({ variant, sx }) => {
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
        sx={sx}
        disableElevation
      >
        Reset API Key
      </Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <ResetAPIKeyDialog onClose={handleCloseDialog} />
      </Dialog>
    </>
  );
};

export default ResetAPIKeyButton;
