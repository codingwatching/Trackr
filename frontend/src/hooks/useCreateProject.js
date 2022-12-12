import { useMutation, useQueryClient } from "react-query";
import ProjectsAPI from "../api/ProjectsAPI";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => ProjectsAPI.createProject(), {
    onSuccess: () => {
      queryClient.removeQueries(ProjectsAPI.QUERY_KEY, { exact: true });
    },
  });

  return [mutation.mutateAsync, mutation];
};
