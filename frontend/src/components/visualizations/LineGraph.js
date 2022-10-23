import TimelineIcon from "@mui/icons-material/Timeline";
import LineGraphEditor from "./LineGraphEditor";
import LineGraphView from "./LineGraphView";

const LineGraph = {
  name: "Line Graph",
  icon: TimelineIcon,
  editor: LineGraphEditor,
  view: LineGraphView,

  serialize: (color) => {
    return JSON.stringify({
      name: LineGraph.name,
      color,
    });
  },
};

export default LineGraph;
