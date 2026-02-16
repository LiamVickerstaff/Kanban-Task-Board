import { useQuery } from "@tanstack/react-query";
import { getBoardOfId } from "../../../api/domains/boardsApi";
import { useUserStore } from "../../../stores/useUserStore";

export const useGetCurrentBoard = () => {
  const boardId = useUserStore((s) => s.currentBoardId);

  const query = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoardOfId(boardId),
    enabled: !!boardId,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
