import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api/usersApi";
import type { User } from "../types/user";

interface UsersResponse {
  data: User[];
  total: number;
}

export const useUsersQuery = (page: number = 1) => {
  return useQuery<UsersResponse>({
    queryKey: ["users", page],
    queryFn: () => usersApi.getUsers(page),
    staleTime: 1000 * 60,
    retry: 1,
  });
};
