export type SubtaskType = {
  title: string;
  complete: boolean;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  subtasks: SubtaskType[];
  status: string;
};


export type ColumnType = {
  title: string;
  id: string;
  tasks: TaskType[];
};
