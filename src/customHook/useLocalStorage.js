import { useState, useEffect, useCallback } from "react";
import { apiUrlFetch, apiUrl } from "../api";
import { hashCode } from "../functions/hash";
import { useStateValue } from "../store";
import { loading, success, error, reset } from "../actions/global";
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    if (item !== undefined) {
      try {
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    }
  });

  const setValue = value => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function useLocalStorageSearch(key, url, nameSearch) {
  const [storedValue, setStoredValue] = useState({});
  const [localStorange, setlocalStorange] = useState([]);
  const dispatchContext = useStateValue();

  const successDispatch = () => {
    dispatch(success());
  };
  let dispatch;
  if (dispatchContext) dispatch = dispatchContext[1];
  const updateCache = (newKey, newData, nameSearch) => {
    let value = localStorange;
    value.push({ key: newKey, data: newData, name: nameSearch });
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(newData);
    successDispatch();
  };

  const fetchApi = useCallback((item, url, nameSearch) => {
    const urlHash = hashCode(url);

    const indexCache =
      item.length > 0 ? item.findIndex(c => c.key === urlHash) : -1;

    if (indexCache !== -1) {
      setStoredValue(item[indexCache].data);
      successDispatch();
    } else {
      return fetch(url + apiUrlFetch, {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => {
          updateCache(urlHash, json.data, nameSearch);
        })
        .catch(e => {
          dispatch(error(e));
        });
    }
  }, []);

  useEffect(() => {
    dispatch(loading());

    let value = JSON.parse(window.localStorage.getItem(key));

    let item = [];
    if (value && Array.isArray(value)) {
      setlocalStorange(value);
      item = value;
    }
    fetchApi(item, apiUrl + url, nameSearch);
  }, [key, url]);

  return storedValue;
}
