import { useMutation, useQueryClient } from "react-query";
import ProjectsAPI from "../api/ProjectsAPI";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => ProjectsAPI.createProject(), {
    onSuccess: () => {
      queryClient.invalidateQueries(ProjectsAPI.QUERY_KEY);
    },
  });

  return [mutation.mutateAsync, mutation];
};
