import { comicsConstants } from "../constants/comics.constants";
import { apiUrl, fetchGetParamWithAsync } from "../api";

export const loadingListComics = data => {
  return { type: comicsConstants.LOADING_LIST, data };
};

export const seatchGetComic = (dispatch, limit, offset, signal, random) => {
  const request = fetchGetParamWithAsync(
    apiUrl +
      `/v1/public/comics?limit=${limit}&offset=${offset}&orderBy=focDate`,
    signal
  );

  if (dispatch) dispatch(loadingListComics());
  return request
    .then(result => {
      if (result.data.count > 0) random(result.data);
      else {
        //dispatch(errorCharacters());
      }
      return result.data;
    })
    .catch(e => {
      //dispatch(errorCharacters());
    });
};
