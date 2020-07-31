import { useState, useEffect, useCallback } from "react";
import { apiUrlFetch, apiUrl } from "../api";
import { hashCode } from "../functions/hash";
import { useStateValue } from "../store";
import { loading, success, error } from "../actions/global";
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

  let dispatch;
  if (dispatchContext) dispatch = dispatchContext[1];

  const successDispatch = useCallback(dispatch => {
    dispatch(success());
  }, []);

  const updateCache = useCallback(
    (newKey, newData, nameSearch, redirection, item) => {
      console.log("entre en update cache");
      let value = item;

      value.push({ key: newKey, data: newData, name: nameSearch, redirection });
      window.localStorage.setItem(key, JSON.stringify(value));

      console.log("entre en update cache", newData);
      setStoredValue(newData);
      successDispatch(dispatch);
    },
    [successDispatch, dispatch, key]
  );

  const fetchApi = useCallback(
    (item, url, nameSearch, redirection) => {
      const urlHash = hashCode(url);

      const indexCache =
        item.length > 0 ? item.findIndex(c => c.key === urlHash) : -1;

      console.log("index", indexCache);
      if (indexCache !== -1) {
        setStoredValue(item[indexCache].data);
        successDispatch(dispatch);
      } else {
        return fetch(url + "&" + apiUrlFetch, {
          method: "GET"
        })
          .then(response => {
            return response.json();
          })
          .then(json => {
            console.log("jaons0", json);
            updateCache(urlHash, json.data, nameSearch, redirection, item);
          })
          .catch(e => {
            dispatch(error(e));
          });
      }
    },
    [successDispatch, dispatch, updateCache]
  );

  const init = useCallback(() => {
    console.log("ente en init");
    if (url) {
      console.log("hay url");
      if (dispatch) dispatch(loading());

      let value = JSON.parse(window.localStorage.getItem(key));

      let item = [];
      if (value && Array.isArray(value)) {
        item = value;
      }
      console.log("estoy en item0", item);
      fetchApi(item, apiUrl + url, nameSearch, redirection);
    }
  }, [url, apiUrl, fetchApi, nameSearch, redirection, dispatch, key]);

  useEffect(init, [url]);

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

        window.localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
