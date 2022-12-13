import { useMutation, useQueryClient } from "react-query";
import FieldsAPI from "../api/FieldsAPI";
import VisualizationsAPI from "../api/VisualizationsAPI";

export const useDeleteField = (projectId) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((fieldId) => FieldsAPI.deleteField(fieldId), {
    onSuccess: (_, fieldId) => {
      queryClient.setQueryData([FieldsAPI.QUERY_KEY, projectId], (oldData) => {
        if (oldData) {
          oldData.data.fields = oldData.data.fields.filter(
            (field) => field.id !== fieldId
          );
        }

        return oldData;
      });

      queryClient.setQueryData(
        [VisualizationsAPI.QUERY_KEY, projectId],
        (oldData) => {
          if (oldData) {
            oldData.data.visualizations = oldData.data.visualizations.filter(
              (visualization) => visualization.fieldId !== fieldId
            );
          }

          return oldData;
        }
      );
    },
  });

  return [mutation.mutateAsync, mutation];
};
