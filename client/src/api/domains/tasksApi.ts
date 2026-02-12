import type { TaskType } from "../../types/dataTypes";
import api from "../apiMethods";

export const fetchTasks = (): Promise<TaskType[]> => {
  return api.get("/task");
};

export const createTask = (newTask: TaskType): Promise<TaskType> => {
  return api.post("/task/new", newTask);
};

export const updateTask = (task: TaskType): Promise<TaskType> => {
  return api.put(`/task/${task.id}`, task);
};

export const deleteTask = (taskId: string): Promise<string> => {
  return api.del(`/task/${taskId}`);
};
