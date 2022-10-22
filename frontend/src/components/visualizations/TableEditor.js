import { useState, forwardRef, useImperativeHandle } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DialogContentText from "@mui/material/DialogContentText";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Table from "./Table";

const TableEditor = forwardRef(({ metadata, setError }, ref) => {
  const [sort, setSort] = useState(metadata?.sort || "");

  useImperativeHandle(ref, () => ({
    submit() {
      if (!sort) {
        setError("You must select a sorting order.");
        return;
      }

      return Table.serialize(sort);
    },
  }));

  const handleChangeSort = (_, newSort) => {
    setSort(newSort);
  };

  return (
    <>
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
    </>
  );
});

export default TableEditor;
