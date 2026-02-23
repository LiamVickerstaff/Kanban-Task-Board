import { useQuery } from "@tanstack/react-query";
import { getAllBoardsOfUserId } from "../../../api/domains/boardsApi";
import { useUser } from "@clerk/clerk-react";

export const useGetAllBoards = () => {
  const { user } = useUser();

  const query = useQuery({
    queryKey: ["boards", user?.id],
    queryFn: () => getAllBoardsOfUserId(),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
