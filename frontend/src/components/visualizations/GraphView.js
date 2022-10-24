import "chartjs-adapter-moment";
import {
  Chart,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  TimeSeriesScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useValues } from "../../hooks/useValues";
import { useMemo } from "react";
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
  BarElement,
  TimeSeriesScale,
  Title,
  Tooltip,
  Legend
);

const GraphView = ({ visualizationType, visualization, metadata }) => {
  const color = metadata?.color || "rgb(255, 99, 132)";
  const limit = metadata?.limit || 0;
  const graphType = metadata?.graphType || "line";
  const graphFunction = metadata?.graphFunction || "none";
  const graphTimestep = metadata?.graphTimestep || "";

  const { fieldId, fieldName } = visualization;
  const [values, , , error] = useValues(fieldId);

  const [dataValues, dataLabels] = useMemo(() => {
    let outerBucket = [];
    let innerBucket;
    let innerBucketDate = new Date(-8640000000000000);

    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      const createdAt = new Date(value.createdAt);
      const deltaMilliseconds = createdAt - innerBucketDate;

      let deltaTimestep;
      if (graphTimestep === "yearly") {
        deltaTimestep = deltaMilliseconds / 31540000000;
      } else if (graphTimestep === "biannually") {
        deltaTimestep = deltaMilliseconds / 15770000000;
      } else if (graphTimestep === "quarterly") {
        deltaTimestep = deltaMilliseconds / 10512000000;
      } else if (graphTimestep === "monthly") {
        deltaTimestep = deltaMilliseconds / 2628000000;
      } else if (graphTimestep === "biweekly") {
        deltaTimestep = deltaMilliseconds / 1209600000;
      } else if (graphTimestep === "weekly") {
        deltaTimestep = deltaMilliseconds / 604800000;
      } else if (graphTimestep === "daily") {
        deltaTimestep = deltaMilliseconds / 86400000;
      } else {
        deltaTimestep = deltaMilliseconds / 3600000;
      }

      if (deltaTimestep > 1) {
        innerBucket = [value];
        innerBucketDate = createdAt;

        outerBucket.push(innerBucket);
      } else {
        innerBucket.push(value);
      }
    }

    let dataValues = [];

    for (let i = 0; i < outerBucket.length; i++) {
      const innerBucket = outerBucket[i];

      let value;
      if (graphFunction === "average") {
        value = 0;

        for (let j = 0; j < innerBucket.length; j++) {
          value += Number(innerBucket[j].value);
        }
        value /= innerBucket.length;
      } else if (graphFunction === "min") {
        value = Number(innerBucket[0].value);

        for (let j = 0; j < innerBucket.length; j++) {
          const currentValue = Number(innerBucket[j].value);
          if (currentValue < value) {
            value = currentValue;
          }
        }
      } else if (graphFunction === "max") {
        value = Number(innerBucket[0].value);

        for (let j = 0; j < innerBucket.length; j++) {
          const currentValue = Number(innerBucket[j].value);
          if (currentValue > value) {
            value = currentValue;
          }
        }
      } else {
        value = 0;

        for (let j = 0; j < innerBucket.length; j++) {
          value += Number(innerBucket[j].value);
        }
      }

      dataValues.push(value);
    }

    console.log(graphTimestep, graphFunction, outerBucket, dataValues);

    return [dataValues, dataValues];
  }, [values, graphTimestep, graphFunction]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxis: {},
    },
  };

  const data = {
    labels: dataLabels,
    datasets: [
      {
        data: dataValues,
        borderColor: color,
        backgroundColor: color,
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
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box>{fieldName}</Box>
          {graphFunction !== "none" && (
            <Box sx={{ ml: 0.5, color: "gray" }}>({graphFunction})</Box>
          )}
        </Box>
        <Box>
          <VisualizationMenuButton
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
          {graphType === "line" ? (
            <Line options={options} data={data} />
          ) : (
            <Bar options={options} data={data} />
          )}
        </Box>
      )}
    </>
  );
};

export default GraphView;
