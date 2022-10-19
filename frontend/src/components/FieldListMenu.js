import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const FieldListMenu = ({ fieldId, fields, onChange, onAddField }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel>Field</InputLabel>
        <Select
          label="Field"
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
          onChange={onChange}
          value={fieldId}
        >
          {fields.length ? (
            fields.map((field) => (
              <MenuItem key={field.id} value={field.id}>
                {field.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Fields</MenuItem>
          )}
          <Divider />
          <MenuItem
            onClick={() => {
              setOpen(false);
              onAddField();
            }}
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <AddRoundedIcon sx={{ mr: 1, color: "#424242", fontSize: 20 }} />
            Add Field
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default FieldListMenu;
