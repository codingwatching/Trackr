import { useMutation, useQueryClient } from "react-query";
import VisualizationsAPI from "../api/VisualizationsAPI";

export const useCreateVisualization = (projectId) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ fieldId, metadata }) =>
      VisualizationsAPI.createVisualization(fieldId, metadata),
    {
      onSuccess: (result, { fieldId, fieldName, metadata }) => {
        queryClient.setQueryData(
          [VisualizationsAPI.QUERY_KEY, projectId],
          (oldData) => {
            if (oldData) {
              oldData.data.visualizations = [
                ...oldData.data.visualizations,
                {
                  id: result.data.id,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  fieldId,
                  fieldName,
                  metadata,
                },
              ];
            }

            return oldData;
          }
        );
      },
    }
  );

  return [mutation.mutateAsync, mutation];
};
