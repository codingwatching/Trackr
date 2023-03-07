import PieChartIcon from "@mui/icons-material/PieChart";
import PieChartView from "./PieChartView";
import PieChartEditor from "./PieChartEditor";

const PieChart = {
  name: "Pie Chart",
  icon: PieChartIcon,
  editor: PieChartEditor,
  view: PieChartView,

  deserialize: (metadata) => {
    const sort = metadata?.sort || "asc";

    return { sort };
  },

  serialize: (sort) => {
    return JSON.stringify({
      name: PieChart.name,
      sort,
    });
  },
};

export default PieChart;
