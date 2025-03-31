import { useEffect, useState, useRef } from "react";

interface FetchResult<T> {
  data: T | null;
  status: number | null;
  error: string | null;
  loading: boolean;
}

const useFetch = <T>(url: string | null): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const cache = useRef<{ [key: string]: T | null }>({});

  useEffect(() => {
    if (!url) return;

    if (cache.current[url]) {
      setData(cache.current[url]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        setStatus(response.status);

        if (!response.ok) {
          throw new Error(`Failed with status: ${response.status}`);
        }

        const jsonData: T = await response.json();
        cache.current[url] = jsonData;
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching JSON:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, status, error, loading };
};

export default useFetch;
