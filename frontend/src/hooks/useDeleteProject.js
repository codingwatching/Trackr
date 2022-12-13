import { useMutation, useQueryClient } from "react-query";
import FieldsAPI from "../api/FieldsAPI";
import ProjectsAPI from "../api/ProjectsAPI";
import VisualizationsAPI from "../api/VisualizationsAPI";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (projectId) => ProjectsAPI.deleteProject(projectId),
    {
      onSuccess: (_, projectId) => {
        queryClient.resetQueries(ProjectsAPI.QUERY_KEY, { exact: true });
        queryClient.resetQueries([ProjectsAPI.QUERY_KEY, projectId]);
        queryClient.resetQueries([VisualizationsAPI.QUERY_KEY, projectId]);
        queryClient.resetQueries([FieldsAPI.QUERY_KEY, projectId]);
      },
    }
  );

  return [mutation.mutateAsync, mutation];
};
