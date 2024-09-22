import { useEffect, useState, useCallback } from 'react';


/**
 * 
 * Created this hook also which will allow us to query the api to get the pic
 * Did this just to demo how we might call the api.
 * I could not see a front end requirement to implement this, but it is ready to go if we
 * want it.
 */
const useFetchDataByPic = (pic: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const url = import.meta.env.VITE_APP_API_URL;
  const port = import.meta.env.VITE_PORT;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${port}/data/pic/${pic}`);
      // Just using fetch instead of axios, so we have to check if the response is ok.
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
