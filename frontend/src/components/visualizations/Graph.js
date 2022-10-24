import BarChartIcon from "@mui/icons-material/BarChart";
import GraphEditor from "./GraphEditor";
import GraphView from "./GraphView";

const LineGraph = {
  name: "Graph",
  icon: BarChartIcon,
  editor: GraphEditor,
  view: GraphView,

  serialize: (color, limit, graphType, graphFunction, graphTimestep) => {
    return JSON.stringify({
      name: LineGraph.name,
      color,
      limit,
      graphType,
      graphFunction,
      graphTimestep,
    });
  },
};

export default LineGraph;
