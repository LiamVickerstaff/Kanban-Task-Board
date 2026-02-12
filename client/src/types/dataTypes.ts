export type SubtaskType = {
  title: string;
  complete: boolean;
};

export type TaskType = {
  id: string;
  columnId: string;
  title: string;
  order: number;
  description: string;
  subtasks: SubtaskType[];
  status: string;
};

export type ColumnType = {
  id?: string;
  order: number;
  title: string;
  tasks?: TaskType[];
};

export type Board = {
  id: string;
  title: string;
  columns?: ColumnType[];
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
