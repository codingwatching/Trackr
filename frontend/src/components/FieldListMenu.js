import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const FieldListMenu = ({ field, fields, onChange, onAddField }) => {
  return (
    <>
      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel>Field</InputLabel>
        <Select label="Field" onChange={onChange} value={field}>
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
            onClick={onAddField}
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
