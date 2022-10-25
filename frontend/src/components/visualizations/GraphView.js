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
import moment from "moment";

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
  const graphType = metadata?.graphType || "line";
  const graphFunction = metadata?.graphFunction || "none";
  const graphTimestep = metadata?.graphTimestep || "";

  const { fieldId, fieldName } = visualization;
  const [values, , , error] = useValues(fieldId);

  const [dataValues, dataLabels] = useMemo(() => {
    if (graphFunction === "none") {
      return [
        values.map((value) => value.value),
        values.map((value) =>
          moment(value.createdAt).format("MMM D YYYY, h:mm:ss")
        ),
      ];
    }

    let outerBucket = [];
    let innerBucket;
    let innerBucketDate = new Date(-8640000000000000);

    let dataValues = [];
    let dataLabels = [];

    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      let createdAt = new Date(value.createdAt);

      let delta;
      if (graphTimestep === "yearly") {
        createdAt.setHours(0, 0, 0, 0);
        createdAt.setDate(1);
        createdAt.setMonth(0);

        delta = moment(createdAt).diff(moment(innerBucketDate), "years", true);
      } else if (graphTimestep === "biannually") {
        const biannual = Math.floor(createdAt.getMonth() / 6);

        createdAt.setHours(0, 0, 0, 0);
        createdAt.setDate(1);
        createdAt.setMonth(biannual * 6);

        delta =
          moment(createdAt).diff(moment(innerBucketDate), "months", true) / 6;
      } else if (graphTimestep === "quarterly") {
        const quarter = Math.floor(createdAt.getMonth() / 3);

        createdAt.setHours(0, 0, 0, 0);
        createdAt.setDate(1);
        createdAt.setMonth(quarter * 3);

        delta =
          moment(createdAt).diff(moment(innerBucketDate), "months", true) / 3;
      } else if (graphTimestep === "monthly") {
        createdAt.setHours(0, 0, 0, 0);
        createdAt.setDate(1);

        delta = moment(createdAt).diff(moment(innerBucketDate), "months", true);
      } else if (graphTimestep === "biweekly") {
        if (i === 0) {
          createdAt = moment(createdAt).startOf("month").toDate();
        } else {
          const subDelta =
            moment(createdAt).diff(moment(innerBucketDate), "weeks", true) / 2;

          if (subDelta > 1) {
            createdAt = moment(createdAt).add(1, "weeks").toDate();
          }
        }

        delta =
          moment(createdAt).diff(moment(innerBucketDate), "weeks", true) / 2;
      } else if (graphTimestep === "weekly") {
        if (i === 0) {
          createdAt = moment(createdAt).startOf("month").toDate();
        } else {
          const subDelta =
            moment(createdAt).diff(moment(innerBucketDate), "weeks", true) > 1;

          if (subDelta > 1) {
            createdAt = moment(createdAt).add(1, "weeks").toDate();
          }
        }

        delta = moment(createdAt).diff(moment(innerBucketDate), "weeks", true);
      } else if (graphTimestep === "daily") {
        createdAt.setHours(0, 0, 0, 0);

        delta = moment(createdAt).diff(moment(innerBucketDate), "days", true);
      } else {
        createdAt.setHours(createdAt.getHours(), 0, 0, 0);

        delta = moment(createdAt).diff(moment(innerBucketDate), "hours", true);
      }

      if (delta >= 1) {
        innerBucket = [value];
        innerBucketDate = createdAt;

        outerBucket.push(innerBucket);

        if (graphTimestep === "yearly") {
          dataLabels.push(moment(createdAt).format("YYYY"));
        } else if (
          graphTimestep === "biannually" ||
          graphTimestep === "quarterly" ||
          graphTimestep === "monthly"
        ) {
          dataLabels.push(moment(createdAt).format("MMM YYYY"));
        } else if (
          graphTimestep === "biweekly" ||
          graphTimestep === "weekly" ||
          graphTimestep === "daily"
        ) {
          dataLabels.push(moment(createdAt).format("MMM D YYYY"));
        } else {
          dataLabels.push(
            moment(innerBucket[0].createdAt).format("MMM D YYYY h:mm:ss")
          );
        }
      } else {
        innerBucket.push(value);
      }
    }

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
      } else if (graphFunction === "count") {
        value = innerBucket.length;
      } else {
        value = 0;

        for (let j = 0; j < innerBucket.length; j++) {
          value += Number(innerBucket[j].value);
        }
      }

      dataValues.push(value);
    }

    return [dataValues, dataLabels];
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
      xAxis:
        graphFunction === "none"
          ? {
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            }
          : {},
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
            <Box sx={{ ml: 0.5, color: "gray" }}>
              ({graphTimestep} {graphFunction})
            </Box>
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
