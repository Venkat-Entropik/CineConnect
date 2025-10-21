import { useState, useEffect } from "react";

type FetchFn<T> = () => Promise<T>;
type UseFetchOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
};

export default function useFetch<T>(
  fetchFn: FetchFn<T>,
  options?: UseFetchOptions<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetchFn();
        if (isMounted) {
          setData(res);
          options?.onSuccess?.(res);
        }
      } catch (err) {
        if (isMounted) {
          const message = err?.response?.data?.message || err?.message || "Something went wrong!";
          setError(message);
          options?.onError?.(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { data, loading, error };
}
