import { useMutation, useQueryClient } from "react-query";
import ProjectsAPI from "../api/ProjectsAPI";
import VisualizationsAPI from "../api/VisualizationsAPI";
import FieldsAPI from "../api/FieldsAPI";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => ProjectsAPI.createProject(), {
    onSuccess: (result) => {
      queryClient.resetQueries(ProjectsAPI.QUERY_KEY, { exact: true });
      queryClient.resetQueries([ProjectsAPI.QUERY_KEY, result.data.id]);
      queryClient.resetQueries([VisualizationsAPI.QUERY_KEY, result.data.id]);
      queryClient.resetQueries([FieldsAPI.QUERY_KEY, result.data.id]);
    },
  });

  return [mutation.mutateAsync, mutation];
};
