import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../api/domains/user";

export const useGetUser = (userId: string) => {
  const query = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
