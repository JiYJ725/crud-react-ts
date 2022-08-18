import {useState, useEffect} from 'react';
import {Todo} from "../model/todo.model";

const useFetch = (url: string) => {
  const [data, setData] = useState<Todo[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, {signal: abortCont.signal})
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
        } else {
          // auto catches network / connection error
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [url])

  return {data, error};
}


export default useFetch;
