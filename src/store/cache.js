import React, { useContext, useCallback, useState } from "react";
import { StateCache } from "../utils/context";

const hashCode = s => {
  let h = 0;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
};

export const StateCacheProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  const [error, setError] = useState(false);
  const fetchApi = useCallback(
    () => {},
    [] // Tells React to memoize regardless of arguments.
  );

  return (
    <StateCache.Provider
      value={{
        isLoading,
        data,
        fetchApi: () => fetchApi,
        error
      }}
    >
      {children}
    </StateCache.Provider>
  );
};

export const CacheStateValue = () => useContext(StateCache);
