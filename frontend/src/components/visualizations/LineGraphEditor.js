import { VisualizationColors } from "./Visualizations";
import { forwardRef, useImperativeHandle, useState } from "react";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LineGraph from "./LineGraph";

const LineGraphEditor = forwardRef(({ metadata, setError }, ref) => {
  const [color, setColor] = useState(metadata?.color || "");

  useImperativeHandle(ref, () => ({
    submit() {
      if (!color) {
        setError("You must select a line color.");
        return;
      }

      return LineGraph.serialize(color);
    },
  }));

  return (
    <>
      <DialogContentText sx={{ mb: 2 }}>
        Select the color of the lines on the graph.
      </DialogContentText>

      <FormControl fullWidth required>
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
    </>
  );
});

export default LineGraphEditor;
