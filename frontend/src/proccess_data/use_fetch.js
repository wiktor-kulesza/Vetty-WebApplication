import {useEffect, useState} from 'react';
import axios from 'axios';
import * as constants from '../constants';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);

        const response = await axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        if (response.status !== 200) {
          if (response.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            window.location.reload();
            throw new Error(constants.FORBIDDEN_ERROR);
          }
          throw new Error(constants.FETCH_ERROR);
        }
        setData(response.data);
        setIsPending(false);
      } catch (e) {
        setError(e.message);
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return {data, isPending, error};
}

export default useFetch;
