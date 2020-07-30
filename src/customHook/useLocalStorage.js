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

export function useLocalStorageSearch(key, url, nameSearch, redirection) {
  const [storedValue, setStoredValue] = useState({});

  const dispatchContext = useStateValue();

  const successDispatch = () => {
    dispatch(success());
  };
  let dispatch;
  if (dispatchContext) dispatch = dispatchContext[1];
  const updateCache = (newKey, newData, nameSearch, redirection, item) => {
    let value = item;
    console.log("value", value);
    value.push({ key: newKey, data: newData, name: nameSearch, redirection });
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(newData);
    successDispatch();
  };

  const fetchApi = useCallback((item, url, nameSearch, redirection) => {
    const urlHash = hashCode(url);

    console.log("item", item);
    const indexCache =
      item.length > 0 ? item.findIndex(c => c.key === urlHash) : -1;

    console.log("indexCache", indexCache);
    if (indexCache !== -1) {
      setStoredValue(item[indexCache].data);
      successDispatch();
    } else {
      return fetch(url + apiUrlFetch, {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => {
          updateCache(urlHash, json.data, nameSearch, redirection, item);
        })
        .catch(e => {
          dispatch(error(e));
        });
    }
  }, []);

  useEffect(() => {
    if (url) {
      dispatch(loading());

      let value = JSON.parse(window.localStorage.getItem(key));

      let item = [];
      if (value && Array.isArray(value)) {
        console.log("no, no esta vacio");
        item = value;
      } else {
        console.log("entro en q esta vacio");
      }
      fetchApi(item, apiUrl + url, nameSearch, redirection);
    }
  }, [key, url]);

  return storedValue;
}

export function useLocalStorageArray(key, initialValue) {
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
      const item = [...storedValue];

      const indexCache =
        item.length > 0 ? item.findIndex(c => c.key === value) : -1;

      if (indexCache !== -1) {
        item.splice(indexCache, 1);

        setStoredValue(item);
        console.log("aca hago el cambio en setStorevalue", item);
        window.localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
