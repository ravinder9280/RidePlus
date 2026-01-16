"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function useCurrentUserId() {
  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) {
      setIsLoading(false);
      return;
    }

    const fetchUserId = async () => {
      try {
        const response = await fetch("/api/user/me");
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);
        }
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, [user, isLoaded]);

  return { userId, isLoading };
}
