import { useEffect, useState, useCallback } from 'react';
import { SampleDataArray } from '../../../../types/SampleData';

export const useFetchAllData = () => {
  const [data, setData] = useState<SampleDataArray>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const url = import.meta.env.VITE_APP_API_URL;
  const port = import.meta.env.VITE_PORT;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${port}/data`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result: SampleDataArray = await response.json();
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [url, port]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
