import { type SuccessResponse } from "../../types/api";
import type { Subtask } from "../../types/dataTypes";
import api from "../apiMethods";

export const updateSubtask = async (subtask: Subtask): Promise<Subtask> => {
  const res = await api.put<SuccessResponse<Subtask>, Subtask>(
    `/subtask/${subtask.id}`,
    subtask,
  );

  return res.data;
};
