import { type SuccessResponse } from "../../types/api";
import type { Task, TaskOrder } from "../../types/dataTypes";
import api from "../apiMethods";

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get<SuccessResponse<Task[]>>("/task");
  return res.data;
};

export const fetchTaskOfId = async (id: string): Promise<Task> => {
  const res = await api.get<SuccessResponse<Task>>(`/task/${id}`);
  return res.data;
};

export const createTask = async (newTask: Omit<Task, "id">): Promise<Task> => {
  const res = await api.post<SuccessResponse<Task>, Omit<Task, "id">>(
    "/task/new",
    newTask,
  );

  return res.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const res = await api.put<SuccessResponse<Task>, Task>(
    `/task/${task.id}`,
    task,
  );

  return res.data;
};

export const updateTaskStatus = async ({
  taskId,
  newColumnId,
}: {
  taskId: string;
  newColumnId: string;
}): Promise<Task> => {
  const res = await api.put<SuccessResponse<Task>>(`/task/change-status`, {
    taskId,
    newColumnId,
  });

  return res.data;
};

export const updateOrderOfTasks = async ({
  changedTasks,
}: {
  changedTasks: TaskOrder[];
}): Promise<Task[]> => {
  const res = await api.put<SuccessResponse<Task[]>>("/task/update-orders", {
    changedTasks,
  });
  return res.data;
};

export const deleteTask = async (taskId: string): Promise<Task> => {
  const res = await api.del<SuccessResponse<Task>>(`/task/${taskId}`);

  return res.data;
};
