import type { Task, TaskOrder } from "../../types/dataTypes";
import api from "../apiMethods";

export const fetchTasks = (): Promise<Task[]> => {
  return api.get<Task[]>("/task");
};

export const fetchTaskOfId = (id: string): Promise<Task> => {
  return api.get<Task>(`/task/${id}`);
};

export const createTask = (newTask: Omit<Task, "id">): Promise<Task> => {
  return api.post("/task/new", newTask);
};

export const updateTask = (task: Task): Promise<Task> => {
  return api.put(`/task/${task.id}`, task);
};

export const updateTaskStatus = ({
  taskId,
  newColumnId,
}: {
  taskId: string;
  newColumnId: string;
}): Promise<Task> => {
  return api.put<Task>(`/task/change-status`, { taskId, newColumnId });
};

export const updateOrderOfTasks = ({
  changedTasks,
}: {
  changedTasks: TaskOrder[];
}): Promise<Task[]> => {
  return api.put<Task[]>("/task/update-orders", { changedTasks });
};

export const deleteTask = (taskId: string): Promise<Task> => {
  return api.del(`/task/${taskId}`);
};
