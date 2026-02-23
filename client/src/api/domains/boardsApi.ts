import type { SuccessResponse } from "../../types/api";
import type { Board } from "../../types/dataTypes";
import type { BoardApiBody } from "../../types/formTypes";
import api from "../apiMethods";

export const getBoardOfId = async (boardId: string): Promise<Board> => {
  const res = await api.get<SuccessResponse<Board>>(`/board/${boardId}`);
  return res.data;
};

export const getAllBoardsOfUserId = async (): Promise<Board[] | []> => {
  const res = await api.get<SuccessResponse<Board[] | []>>(`/board/all`);
  return res.data;
};

export const createBoard = async (newBoard: BoardApiBody): Promise<Board> => {
  const res = await api.post<SuccessResponse<Board>, BoardApiBody>(
    "/board/new",
    newBoard,
  );
  return res.data;
};

export const updateBoard = async (
  updatedBoard: BoardApiBody,
): Promise<Board> => {
  const res = await api.put<SuccessResponse<Board>, BoardApiBody>(
    `/board/${updatedBoard.id}`,
    updatedBoard,
  );

  return res.data;
};

export const deleteBoard = async (boardId: string): Promise<Board> => {
  const res = await api.del<SuccessResponse<Board>>(`/board/${boardId}`);
  return res.data;
};
