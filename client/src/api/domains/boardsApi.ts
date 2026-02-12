import type { Board } from "../../types/dataTypes";
import type { BoardFormData } from "../../types/formTypes";
import api from "../apiMethods";

export const getBoardOfId = (boardId: string): Promise<Board> => {
  return api.get<Board>(`/board/${boardId}`);
};

export const createBoard = (newBoard: BoardFormData): Promise<Board> => {
  console.log("called createBoard fetch: ", newBoard);

  return api.post<Board, BoardFormData>("/board/new", newBoard);
};

export const updateBoard = (board: Board): Promise<Board> => {
  return api.put(`/board/${board.id}`, board);
};

export const deleteBoard = (boardId: string): Promise<string> => {
  return api.del(`/board/${boardId}`);
};
