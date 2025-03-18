import { useEffect, useState, useCallback } from "react";
import { getUserApi } from "@/firestore/user/userDB";
import { User } from "@/interfaces/User";

export const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await getUserApi(userId);

      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
        setError("User not found");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching user data");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);

  return { user, loading, error, refetch: fetchUser };
};
