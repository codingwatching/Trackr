import PieChartIcon from "@mui/icons-material/PieChart";
import TableView from "./TableView";
import PieChartEditor from "./PieChartEditor";

const PieChart = {
  name: "Pie Chart",
  icon: PieChartIcon,
  editor: PieChartEditor, // CHANGE TO PieChartEditor
  view: TableView,

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
