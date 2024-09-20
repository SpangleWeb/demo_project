import { useEffect, useState, useCallback } from 'react';

const useFetchDataByPic = (pic: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const url = process.env.APP_API_URL;
  const port = process.env.PORT;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${port}/data/pic/${pic}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
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
  }, [url, port, pic]);

  useEffect(() => {
    if (pic) {
      fetchData();
    }
  }, [fetchData, pic]);

  return { data, loading, error };
};

export default useFetchDataByPic;
