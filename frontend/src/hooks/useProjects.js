import { useQuery } from "react-query";
import ProjectsAPI from "../api/ProjectsAPI";

export const useProjects = () => {
  const { data } = useQuery(ProjectsAPI.QUERY_KEY, ProjectsAPI.getProjects, {
    suspense: true,
  });

  return data.data.projects;
};
