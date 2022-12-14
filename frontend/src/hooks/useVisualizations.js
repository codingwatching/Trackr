import { useQuery } from "react-query";
import VisualizationsAPI from "../api/VisualizationsAPI";

export const useVisualizations = (projectId) => {
  const { data } = useQuery(
    [VisualizationsAPI.QUERY_KEY, projectId],
    () => VisualizationsAPI.getVisualizations(projectId),
    {
      suspense: true,
    }
  );

  return data.data.visualizations;
};
