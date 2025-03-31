import {useEffect, useState} from "react";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(url);
        setStatus(response.status);

        if (!response.ok) {
          throw new Error(`Failed with status: ${response.status}`);
        }

        const jsonData: T = await response.json();
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

  return {data, status, error, loading};
};

export default useFetch;
