import { VisualizationColors } from "./Visualizations";
import { forwardRef, useImperativeHandle, useState } from "react";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LineGraph from "./LineGraph";

const LineGraphEditor = forwardRef(({ metadata, setError }, ref) => {
  const [color, setColor] = useState(metadata?.color || "");
  const [limit, setLimit] = useState(metadata?.limit || "");

  useImperativeHandle(ref, () => ({
    submit() {
      if (!color) {
        setError("You must select a line color.");
        return;
      }

      if (limit) {
        const numberLimit = Number(limit);
        if (!numberLimit) {
          setError("Your limit should be a valid number.");
          return;
        }

        if (numberLimit && !Number.isInteger(numberLimit)) {
          setError("Your limit should be an integer.");
          return;
        }

        if (numberLimit && numberLimit < 0) {
          setError("Your limit should be greater than or equal to 0.");
          return;
        }
      }

      return LineGraph.serialize(color, limit);
    },
  }));

  return (
    <>
      <DialogContentText sx={{ mb: 2 }}>
        Select the color of the lines on the graph.
      </DialogContentText>

      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel>Line Color</InputLabel>
        <Select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          label="Line Color"
        >
          {VisualizationColors.map((color) => (
            <MenuItem key={color[0]} value={color[1]}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    background: color[1],
                    height: "12px",
                    width: "12px",
                    borderRadius: "100%",
                    mr: 1,
                  }}
                />
                <Box>{color[0]}</Box>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DialogContentText sx={{ mb: 2 }}>
        Enter the limit of the number of values to be displayed at once. Leave
        blank (or enter zero) if you want all values displayed.
      </DialogContentText>

      <TextField
        fullWidth
        label="Limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
    </>
  );
});

export default LineGraphEditor;
