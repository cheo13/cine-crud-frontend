import { useEffect, useState } from "react";
import { axiosInstance } from "./axiosConfig"; // Ajusta la importación según tu configuración

export const useOne = <T>(
  resource: string,
  id: string
): { data: T | null; isLoading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/${resource}/${id}`);
        setData(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [resource, id]);

  return { data, isLoading, error };
};
