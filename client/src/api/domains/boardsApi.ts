import type { Board } from "../../types/dataTypes";
import type { BoardApiBody } from "../../types/formTypes";
import api from "../apiMethods";

export const getBoardOfId = (boardId: string): Promise<Board> => {
  return api.get<Board>(`/board/${boardId}`);
};

export const getAllBoardsOfUserId = (userId: string): Promise<Board[]> => {
  return api.get<Board[]>(`/board/all/${userId}`);
};

export const createBoard = (newBoard: BoardApiBody): Promise<Board> => {
  return api.post<Board, BoardApiBody>("/board/new", newBoard);
};

export const updateBoard = (updatedBoard: BoardApiBody): Promise<Board> => {
  return api.put<Board, BoardApiBody>(
    `/board/${updatedBoard.id}`,
    updatedBoard,
  );
};

export const deleteBoard = (boardId: string): Promise<Board> => {
  return api.del<Board>(`/board/${boardId}`);
};
