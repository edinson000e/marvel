export const apiUrl = process.env.REACT_APP_DOMAIN;

export const fetchGet = url => {
  return fetch(
    `${url}?apikey=ceb26677f5c9f39593c1083fe8f2abea&ts=2&hash=43448cc8eb8598d8d39e09269d354c3e&limit=100`,
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
  return fetch(
    `${url}&apikey=ceb26677f5c9f39593c1083fe8f2abea&ts=2&hash=43448cc8eb8598d8d39e09269d354c3e&limit=100`,
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
