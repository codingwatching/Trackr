import { useQuery } from "react-query";
import ProjectsAPI from "../api/ProjectsAPI";

export const useProject = (projectId) => {
  const { data } = useQuery(
    ProjectsAPI.QUERY_KEY + projectId,
    () => ProjectsAPI.getProject(projectId),
    {
      suspense: true,
    }
  );

  return data.data;
};
