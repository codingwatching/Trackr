import { useState } from "react";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import EditUserDialog from "./EditUserDialog";

const EditUserButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = (event) => {
    event.preventDefault();

    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Link href="#" onClick={openDialog}>
        Edit name
      </Link>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <EditUserDialog onClose={closeDialog} />
      </Dialog>
    </>
  );
};

export default EditUserButton;
