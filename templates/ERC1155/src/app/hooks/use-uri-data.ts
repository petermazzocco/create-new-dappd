import { useState, useEffect } from 'react';
import axios from 'axios';
import { TMetadata } from '../types/metadata';

function useUriData({ uri }) {
  const [data, setData] = useState<TMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function fetchUri() {
      try {
        const res = await axios.get(uri);
        setData(res.data as TMetadata);
        setIsSuccess(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (uri) {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);
      fetchUri();
    }
  }, [uri]);

  return { data, isLoading, isError, isSuccess };
}

export default useUriData;
