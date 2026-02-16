import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../../stores/useUserStore";
import { getAllBoardsOfUserId } from "../../../api/domains/boardsApi";

export const useGetAllBoards = () => {
  const userId = useUserStore((s) => s.id);

  const query = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => getAllBoardsOfUserId(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
