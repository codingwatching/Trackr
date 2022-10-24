import {
  forwardRef,
  useImperativeHandle,
  useState,
  createElement,
} from "react";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LineGraph from "./Graph";
import TimelineIcon from "@mui/icons-material/Timeline";
import BarChartIcon from "@mui/icons-material/BarChart";

const GraphColors = [
  ["Red", "rgba(255, 99, 132)"],
  ["Green", "rgba(71, 223, 61)"],
  ["Blue", "rgba(68, 155, 245)"],
  ["Purple", "rgba(103, 68, 245)"],
  ["Orange", "rgba(245, 133, 68)"],
];

const GraphTypes = [
  ["Line", TimelineIcon],
  ["Bar", BarChartIcon],
];

const GraphFunctions = ["None", "Average", "Min", "Max", "Sum"];
const GraphTimesteps = [
  "Yearly",
  "Biannually",
  "Quarterly",
  "Monthly",
  "Biweekly",
  "Weekly",
  "Daily",
  "Hourly",
];

const GraphEditor = forwardRef(({ metadata, setError }, ref) => {
  const [color, setColor] = useState(metadata?.color || "");
  const [graphType, setGraphType] = useState(metadata?.graphType || "");
  const [graphFunction, setGraphFunction] = useState(
    metadata?.graphFunction || "none"
  );
  const [graphTimestep, setGraphTimestep] = useState(
    metadata?.graphTimestep || ""
  );
  const [limit, setLimit] = useState(metadata?.limit || "");

  useImperativeHandle(ref, () => ({
    submit() {
      if (!color) {
        setError("You must select a graph color.");
        return;
      }

      if (!graphType) {
        setError("You must select a graph type.");
        return;
      }

      if (!graphFunction) {
        setError("You must select a graph function.");
        return;
      }

      if (graphFunction !== "none" && !graphTimestep) {
        setError("You must select a timestep.");
        return;
      }

      if (limit) {
        const numberLimit = Number(limit);
        if (!numberLimit) {
          setError("Your limit should be a valid number.");
          return;
        }

        if (!Number.isInteger(numberLimit)) {
          setError("Your limit should be an integer (no decimal places).");
          return;
        }

        if (numberLimit < 0) {
          setError("Your limit should be greater than or equal to 0.");
          return;
        }
      }

      return LineGraph.serialize(
        color,
        limit,
        graphType,
        graphFunction,
        graphTimestep
      );
    },
  }));

  return (
    <>
      <DialogContentText sx={{ mb: 2 }}>
        Select the type and color of your graph.
      </DialogContentText>

      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel>Graph Type</InputLabel>
        <Select
          value={graphType}
          onChange={(e) => setGraphType(e.target.value.toLowerCase())}
          label="Graph Type"
        >
          {GraphTypes.map((graphType) => (
            <MenuItem key={graphType[0]} value={graphType[0].toLowerCase()}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {createElement(
                  graphType[1],
                  { sx: { mr: 1, color: "gray" } },
                  {}
                )}
                <Box>{graphType[0]}</Box>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel>Color</InputLabel>
        <Select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          label="Color"
        >
          {GraphColors.map((color) => (
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
        You can optionally enter the limit of the number of values to be
        displayed at once. Leave the text field blank if you want all values
        displayed.
      </DialogContentText>

      <TextField
        sx={{ mb: 2 }}
        fullWidth
        label="Limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />

      <DialogContentText sx={{ mb: 2 }}>
        You can optionally select an aggregate function and a timestep.
      </DialogContentText>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Function</InputLabel>
          <Select
            value={graphFunction}
            onChange={(e) => setGraphFunction(e.target.value.toLowerCase())}
            label="Function"
          >
            {GraphFunctions.map((graphFunction) => (
              <MenuItem key={graphFunction} value={graphFunction.toLowerCase()}>
                {graphFunction}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={graphFunction === "none"}>
          <InputLabel>Timestep</InputLabel>
          <Select
            value={graphFunction !== "none" ? graphTimestep : ""}
            onChange={(e) => setGraphTimestep(e.target.value.toLowerCase())}
            label="Timestep"
          >
            {GraphTimesteps.map((graphTimestep) => (
              <MenuItem key={graphTimestep} value={graphTimestep.toLowerCase()}>
                {graphTimestep}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
});

export default GraphEditor;
