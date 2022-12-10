import useSWR from "swr";
import ProjectsAPI from "../api/ProjectsAPI";

export const useProjects = () => {
  const { data, mutate } = useSWR("/api/projects", ProjectsAPI.getProjects, {
    suspense: true,
  });

  return [data, mutate];
};
