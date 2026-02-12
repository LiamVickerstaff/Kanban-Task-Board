import { useQuery } from "@tanstack/react-query";
import { getBoardOfId } from "../../../api/domains/boardsApi";

export const useGetCurrentBoard = (boardId: string) =>
  useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoardOfId(boardId),
    enabled: !!boardId,
  });
