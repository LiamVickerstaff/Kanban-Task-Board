export type SubtaskType = {
  title: string;
  complete: boolean;
};

export type TaskType = {
  id: string;
  title: string;
  subtasks: SubtaskType[];
};

export type ColumnType = {
  title: string;
  id: string;
  tasks: TaskType[];
};
