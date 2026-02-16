import type { NewUser, User } from "../../types/dataTypes";
import api from "../apiMethods";

export const getUser = async (userId: string): Promise<User> => {
  const user = await api.get<User>(`/user/${userId}`);
  return user;
};

export const createUser = (newUser: NewUser): Promise<User> => {
  return api.post<User, NewUser>("/user/new", newUser);
};

export const updateUser = (
  updatedUser: Omit<User, "boards">,
): Promise<User> => {
  return api.patch<User, Omit<User, "boards">>(
    `/user/${updatedUser.id}`,
    updatedUser,
  );
};

export const deleteUser = (userId: string): Promise<string> => {
  return api.del<string>(`/user/${userId}`);
};
