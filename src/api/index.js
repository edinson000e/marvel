import md5 from "crypto-js/md5";

export const apiUrl = process.env.REACT_APP_DOMAIN;
export const apiKey = process.env.REACT_APP_APIKEY;
export const apiTs = process.env.REACT_APP_TS;
export const apiPublic = process.env.REACT_APP_PUBLIC;
const hash = md5(apiTs + apiKey + apiPublic).toString();
export const apiUrlFetch = `apikey=${apiPublic}&ts=${apiTs}&hash=${hash}`;

export const fetchGet = url => {
  return fetch(
    `${url}?apikey=${apiPublic}&ts=${apiTs}&hash=${hash}&limit=100`,
    {
      method: "GET"
    }
  )
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {});
};
export const fetchGetParam = url => {
  return fetch(`${url}&apikey=${apiPublic}&ts=${apiTs}&hash=${hash}`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
};

export const fetchGetParamWithAsync = (url, signal) => {
  return fetch(`${url}&apikey=${apiPublic}&ts=${apiTs}&hash=${hash}`, {
    method: "GET",
    signal: signal
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
};
