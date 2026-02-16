import { useQuery } from "@tanstack/react-query";
import { fetchTaskOfId } from "../../../api/domains/tasksApi";

export const useGetTaskOfId = (id: string) => {
  const query = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskOfId(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
