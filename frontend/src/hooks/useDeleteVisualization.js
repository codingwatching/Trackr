import { useMutation, useQueryClient } from "react-query";
import VisualizationsAPI from "../api/VisualizationsAPI";

export const useDeleteVisualization = (projectId) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (id) => VisualizationsAPI.deleteVisualization(id),
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData(
          [VisualizationsAPI.QUERY_KEY, projectId],
          (oldData) => {
            if (oldData) {
              oldData.data.visualizations = oldData.data.visualizations.filter(
                (visualization) => visualization.id !== id
              );
            }

            return oldData;
          }
        );
      },
    }
  );

  return [mutation.mutateAsync, mutation];
};
