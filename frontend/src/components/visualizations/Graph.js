import TimelineIcon from "@mui/icons-material/Timeline";
import BarChartIcon from "@mui/icons-material/BarChart";
import GraphEditor from "./GraphEditor";
import GraphView from "./GraphView";

export const GraphColors = [
  ["Red", "rgba(255, 99, 132)"],
  ["Green", "rgba(71, 223, 61)"],
  ["Blue", "rgba(68, 155, 245)"],
  ["Purple", "rgba(103, 68, 245)"],
  ["Orange", "rgba(245, 133, 68)"],
];

export const GraphTypes = [
  ["Line", TimelineIcon],
  ["Bar", BarChartIcon],
];

export const GraphFunctions = ["None", "Average", "Min", "Max", "Sum"];
export const GraphTimesteps = [
  "Yearly",
  "Biannually",
  "Quarterly",
  "Monthly",
  "Biweekly",
  "Weekly",
  "Daily",
  "Hourly",
];

const Graph = {
  name: "Graph",
  icon: BarChartIcon,
  editor: GraphEditor,
  view: GraphView,

  serialize: (color, limit, graphType, graphFunction, graphTimestep) => {
    return JSON.stringify({
      name: Graph.name,
      color,
      limit,
      graphType,
      graphFunction,
      graphTimestep,
    });
  },
};

export default Graph;
