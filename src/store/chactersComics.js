import React, { useContext, useCallback, useState } from "react";
import { StateCharactersComics } from "../utils/context";
import { apiUrlFetch, apiUrl } from "../api";
import { hashCode } from "../functions/hash";

export const StateChactersComicsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  const [cache, setCache] = useState([]);
  const [error, setError] = useState(false);

  const updateCache = (newKey, newData) => {
    let value = cache;

    value.push({ key: newKey, data: newData });
    setCache(value);

    setData(newData);
    setIsLoading(false);
  };

  const fetchApi = useCallback(url => {
    setIsLoading(true);
    const urlHash = hashCode(url);
    const indexCache =
      cache.length > 0 ? cache.findIndex(c => c.key === urlHash) : -1;

    if (indexCache !== -1) {
      setData(cache[indexCache].data);
      setIsLoading(false);
    } else {
      return fetch(url + apiUrlFetch, {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => {
          updateCache(urlHash, json.data);
        })
        .catch(e => {
          setError(true);
        });
    }
  }, []);

  return (
    <StateCharactersComics.Provider
      value={{
        isLoading,
        data,
        fetchApi: url => fetchApi(url),
        error
      }}
    >
      {children}
    </StateCharactersComics.Provider>
  );
};

export const useStateChactersComicsValue = () =>
  useContext(StateCharactersComics);
