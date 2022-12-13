import { useMutation, useQueryClient } from "react-query";
import VisualizationsAPI from "../api/VisualizationsAPI";

export const useUpdateVisualization = (projectId) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ id, fieldId, metadata }) =>
      VisualizationsAPI.updateVisualization(id, fieldId, metadata),
    {
      onSuccess: (_, { id, fieldId, metadata }) => {
        queryClient.setQueryData(
          [VisualizationsAPI.QUERY_KEY, projectId],
          (oldData) => {
            if (oldData) {
              const visualization = oldData.data.visualizations.find(
                (visualization) => visualization.id === id
              );
              visualization.fieldId = fieldId;
              visualization.metadata = metadata;
            }
            return oldData;
          }
        );
      },
    }
  );

  return [mutation.mutateAsync, mutation];
};
