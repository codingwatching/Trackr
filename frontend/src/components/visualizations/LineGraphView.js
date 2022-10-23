import "chartjs-adapter-moment";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeSeriesScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useValues } from "../../hooks/useValues";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import CenteredBox from "../CenteredBox";
import VisualizationMenuButton from "../VisualizationMenuButton";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeSeriesScale,
  Title,
  Tooltip,
  Legend
);

const LineGraphView = ({ visualizationType, visualization, metadata }) => {
  const { fieldId, fieldName } = visualization;
  const { color, limit } = metadata;
  const [values, , loading, error] = useValues(fieldId, null, null, limit);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        type: "timeseries",
        display: false,
      },
    },
  };

  const data = {
    labels: values.map((value) => value.createdAt),
    datasets: [
      {
        data: values.map((value) => value.value),
        borderColor: color || "rgb(255, 99, 132)",
        backgroundColor: color || "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          pb: 1.5,
          mb: 1.5,
          borderBottom: "1px solid #0000001f",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{fieldName}</Box>
        <Box>
          <VisualizationMenuButton
            disabled={loading || error !== undefined}
            visualizationType={visualizationType}
            visualization={visualization}
            metadata={metadata}
          />
        </Box>
      </Box>

      {error ? (
        <CenteredBox>
          <ErrorIcon sx={{ fontSize: 50, mb: 1.5 }} />
          <Typography variant="h7" sx={{ userSelect: "none", mb: 2 }}>
            {error}
          </Typography>
        </CenteredBox>
      ) : (
        <Box sx={{ height: "100%" }}>
          <Line options={options} data={data} />
        </Box>
      )}
    </>
  );
};

export default LineGraphView;
