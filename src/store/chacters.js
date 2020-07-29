import React, { useContext, useCallback, useState } from "react";
import { StateCharacter } from "../utils/context";
import { apiUrlFetch, apiUrl } from "../api";
import { hashCode } from "../functions/hash";

export const StateChactersProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  const [cache, setCache] = useState([]);
  const [error, setError] = useState(false);

  const updateCache = (newKey, newData) => {
    let value = cache;

    console.log("newData", newData);
    value.push({ key: newKey, data: newData });
    setCache(value);
    setIsLoading(false);
    setData(newData);
  };

  const fetchApi = useCallback((url, api) => {
    const urlHash = hashCode(url);
    const indexCache =
      cache.length > 0 ? cache.findIndex(c => c.key === urlHash) : -1;

    let apiFetch = apiUrl;
    if (api) apiFetch = api;
    if (indexCache !== -1) {
      setData(cache[indexCache].data);
    } else {
      setIsLoading(true);
      return fetch(apiFetch + url + apiUrlFetch, {
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
    <StateCharacter.Provider
      value={{
        isLoading,
        data,
        fetchApi: url => fetchApi(url),
        error
      }}
    >
      {children}
    </StateCharacter.Provider>
  );
};

export const useStatechacterValue = () => useContext(StateCharacter);
