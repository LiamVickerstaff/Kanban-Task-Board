import type { Subtask } from "../../types/dataTypes";
import api from "../apiMethods";

export const updateSubtask = (subtask: Subtask): Promise<Subtask> => {
  return api.put<Subtask, Subtask>(`/subtask/${subtask.id}`, subtask);
};
