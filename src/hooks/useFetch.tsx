import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/interceptor";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean | null | string>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then(res => {
        setLoading(false);
        setData(res);
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
