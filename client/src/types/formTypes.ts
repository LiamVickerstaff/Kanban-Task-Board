import type { ColumnType } from "./dataTypes";

export type BoardFormData = {
  title: string;
  columns: ColumnType[];
  userId: string;
};
