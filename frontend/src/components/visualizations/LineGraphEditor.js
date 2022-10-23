import { forwardRef, useImperativeHandle, useState } from "react";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LineGraph from "./LineGraph";

const LineColors = [
  ["Red", "rgba(255, 99, 132)"],
  ["Green", "rgba(71, 223, 61)"],
  ["Blue", "rgba(68, 155, 245)"],
  ["Purple", "rgba(103, 68, 245)"],
  ["Orange", "rgba(245, 133, 68)"],
];

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

      <FormControl fullWidth>
        <InputLabel>Line Color</InputLabel>
        <Select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          label="Line Color"
        >
          {LineColors.map((lineColor) => (
            <MenuItem key={lineColor[0]} value={lineColor[1]}>
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
                    background: lineColor[1],
                    height: "12px",
                    width: "12px",
                    borderRadius: "100%",
                    mr: 1,
                  }}
                />
                <Box>{lineColor[0]}</Box>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
});

export default LineGraphEditor;
