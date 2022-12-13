import { useMutation, useQueryClient } from "react-query";
import ProjectsAPI from "../api/ProjectsAPI";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ id, name, description, resetAPIKey }) => {
      return ProjectsAPI.updateProject(id, name, description, resetAPIKey);
    },
    {
      onSuccess: (result, { id, name, description }) => {
        queryClient.setQueryData([ProjectsAPI.QUERY_KEY, id], (oldData) => {
          if (oldData) {
            oldData.data = {
              ...oldData.data,
              name,
              description,
              apiKey: result.data.apiKey,
              updatedAt: new Date().toISOString(),
            };
          }

          return oldData;
        });
      },
    }
  );

  return [mutation.mutateAsync, mutation];
};
