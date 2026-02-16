import type { Task } from "./dataTypes";

type BoardColumnForm = {
  id?: string;
  title: string;
};

type BoardColumnApi = BoardColumnForm & {
  order: number;
};

export type BoardFormData = {
  title: string;
  columns: BoardColumnForm[];
  id?: string;
  userId?: string;
};

export type BoardApiBody = Omit<BoardFormData, "columns"> & {
  columns: BoardColumnApi[];
};

export type CreateTaskFormData = Omit<Task, "id" | "order" | "columnId">;
