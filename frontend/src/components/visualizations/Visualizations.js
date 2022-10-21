import { createElement } from "react";
import Table from "./Table";
import LineGraph from "./LineGraph";
import BubbleGraph from "./BubbleGraph";

const Visualizations = {
  table: Table,
  lineGraph: LineGraph,
  bubbleGraph: BubbleGraph,
};

export const createVisualizationElement = (visualization) => {
  const metadata = JSON.parse(visualization.metadata);
  const visualizations = Object.values(Visualizations);

  for (let i = 0; i < visualizations.length; i++) {
    if (visualizations[i].name === metadata.name) {
      return createElement(
        visualizations[i].view,
        { visualization, metadata },
        {}
      );
    }
  }

  throw new Error("unknown component name: " + metadata.name);
};

export default Visualizations;
