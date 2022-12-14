import { useQuery } from "react-query";
import UsersAPI from "../api/UsersAPI";

export const useUser = () => {
  const { data } = useQuery(UsersAPI.QUERY_KEY, UsersAPI.getUser, {
    suspense: true,
  });

  return data.data;
};
