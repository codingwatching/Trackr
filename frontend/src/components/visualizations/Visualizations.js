import { createElement } from "react";
import Table from "./Table";
import LineGraph from "./LineGraph";
import BubbleGraph from "./BubbleGraph";

const VisualizationTypes = [Table, LineGraph, BubbleGraph];

export const createVisualizationElement = (visualization) => {
  const metadata = JSON.parse(visualization.metadata);

  for (let i = 0; i < VisualizationTypes.length; i++) {
    if (VisualizationTypes[i].name === metadata.name) {
      return createElement(
        VisualizationTypes[i].view,
        {
          visualization,
          visualizationType: VisualizationTypes[i],
          metadata,
        },
        {}
      );
    }
  }

  throw new Error("unknown component name: " + metadata.name);
};

export default VisualizationTypes;
