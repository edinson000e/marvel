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

export function useLocalStorageSearch(key, url) {
  const [storedValue, setStoredValue] = useState({});
  const [localStorange, setlocalStorange] = useState([]);
  const dispatchContext = useStateValue();

  const successDispatch = () => {
    dispatch(success());
  };
  let dispatch;
  if (dispatchContext) dispatch = dispatchContext[1];
  const updateCache = (newKey, newData) => {
    console.log("{ key: newKey, data: newData }", {
      key: newKey,
      data: newData
    });
    let value = localStorange;
    value.push({ key: newKey, data: newData });
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(newData);
    successDispatch();
  };

  const fetchApi = useCallback((item, url) => {
    const urlHash = hashCode(url);

    const indexCache =
      item.length > 0 ? item.findIndex(c => c.key === urlHash) : -1;

    if (indexCache !== -1) {
      console.log("ya esta en cachet");
      setStoredValue(item[indexCache].data);
      successDispatch();
    } else {
      console.log("no, no esta, buscare ya esta en cachet");
      return fetch(url + apiUrlFetch, {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => {
          updateCache(urlHash, json.data);
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
    fetchApi(item, apiUrl + url);
  }, [key, url]);

  return storedValue;
}
