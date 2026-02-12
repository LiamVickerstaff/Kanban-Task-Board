import { getUser } from "../../api/domains/user";
import { useUserStore } from "../../stores/useUserStore";

export const useGetUser = async (userId: string) => {
  const setUser = useUserStore((s) => s.setUser);

  try {
    // Get user
    const user = await getUser(userId);
    // Set global user data with zustand
    setUser(user);
  } catch (error) {
    console.error(error.)
  }
};
