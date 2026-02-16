export type Subtask = {
  id: string;
  title: string;
  complete: boolean;
  taskId?: string;
};

export type Task = {
  id: string;
  columnId: string;
  title: string;
  order: number;
  description: string;
  subtasks: Subtask[];
};

export type Column = {
  id: string;
  order: number;
  title: string;
  tasks?: Task[];
};

export type Board = {
  id: string;
  title: string;
  columns?: Column[];
};

export type User = {
  id: string;
  email: string;
  username: string;
  boards: Board[];
};

export type NewUser = {
  email: string;
  username: string;
};
