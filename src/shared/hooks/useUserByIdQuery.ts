import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api/usersApi";
import type { User } from "../types/user";

export const useUserByIdQuery = (id: string) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
    staleTime: Infinity,
  });
};
