import TimelineIcon from "@mui/icons-material/Timeline";
import LineGraphEditor from "./LineGraphEditor";
import LineGraphView from "./LineGraphView";

const LineGraph = {
  name: "Line Graph",
  icon: TimelineIcon,
  editor: LineGraphEditor,
  view: LineGraphView,

  serialize: (color, limit) => {
    return JSON.stringify({
      name: LineGraph.name,
      color,
      limit,
    });
  },
};

export default LineGraph;
