import { ProjectRouteContext } from "../../routes/ProjectRoute";
import {useEffect, useState, useContext, useMemo} from "react";
import { useValues } from "../../hooks/useValues";
import { useProject } from "../../hooks/useProject";
import PieChart from "./PieChart";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';



// color function is from https://stackoverflow.com/questions/470690/how-to-automatically-generate-n-distinct-colors
function selectColors(num_colors) {
  let colors = [];
  let hue;
  let saturation;
  let lightness;
  for(let i = 0;i < 360;i += 360 / num_colors) {
    hue = i;
    saturation = 60 + Math.random() * 10;
    lightness = 50 + Math.random() * 10;

    colors.push(`hsl(${hue},${saturation}%,${lightness}%)`)
  }
  return colors;
}

const PieChartSubView = ({ visualization, metadata }) => {
  const projectId = useContext(ProjectRouteContext);
  const project = useProject(projectId);
  const { fieldId } = visualization;
  const [values] = useValues(project.apiKey, fieldId);

  const labels = [];
  // const { labels } = PieChart.deserialize(metadata); //TODO make creation of labels by the user
  ChartJS.register(ArcElement, Tooltip, Legend);

  // const backgroundColors = [];
  // const borderColors = [];
  const colorVals = selectColors(values.length);
  // for(let i = 0; i<values.length; i++)
  // {
  //   let
  //   backgroundColors.push(colorVals);
  //   borderColors.push(colorVals);
  // }



  const data = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        label: '# of Votes', // WHY? FOR WHAT?
        data: values,
        backgroundColor: colorVals,
        borderColor: colorVals,
        borderWidth: 1,
        radius: 150,
      },
    ],

  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

  };


  return <Pie options={options} data={data} />;

};

export default PieChartSubView;
