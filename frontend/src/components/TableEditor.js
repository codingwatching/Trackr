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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Table from "./Table";

const TableEditor = ({
  onBack,
  onClose,
  project,
  fields,
  visualizations,
  setVisualizations,
}) => {
  const [error, setError] = useState();
  const [sort, setSort] = useState("desc");
  const [field, setField] = useState("");

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

    if (onBack) {
      setVisualizations([...visualizations, Table.serialize(0, field, sort)]);
    }

    onClose();
  };

  return (
    <>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {onBack && (
          <IconButton color="primary" sx={{ mr: 1 }} onClick={onBack}>
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
          sorted and contigous manner. Select a field you wish to display in a
          table format.
        </DialogContentText>

        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Field</InputLabel>
          <Select label="Field" onChange={handleChangeField} value={field}>
            {fields.map((field) => (
              <MenuItem key={field.id} value={field.id}>
                {field.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
        {onBack && <Button onClick={onClose}>Cancel</Button>}
        <LoadingButton
          variant="contained"
          disableElevation
          autoFocus
          onClick={handleSubmit}
        >
          {onBack ? "Create" : "Save"}
        </LoadingButton>
      </DialogActions>
    </>
  );
};
export default TableEditor;
