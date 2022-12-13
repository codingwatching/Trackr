import { useMutation, useQueryClient } from "react-query";
import ProjectsAPI from "../api/ProjectsAPI";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (projectId) => ProjectsAPI.deleteProject(projectId),
    {
      onSuccess: (_, projectId) => {
        queryClient.setQueryData(ProjectsAPI.QUERY_KEY, (oldData) => {
          if (oldData) {
            oldData.data.projects = oldData.data.projects.filter(
              (project) => project.id !== projectId
            );
          }

          return oldData;
        });
      },
    }
  );

  return [mutation.mutateAsync, mutation];
};
