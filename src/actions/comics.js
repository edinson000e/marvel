import { comicsConstants } from "../constants/comics.constants";
import { apiUrl, fetchGetParam } from "../api";

export const saveComics = data => {
  return { type: comicsConstants.SAVE_LIST, data };
};

export const errorComics = data => {
  return { type: comicsConstants.ERROR_LIST, data };
};

export const loadingListComics = data => {
  return { type: comicsConstants.LOADING_LIST, data };
};

export const resetComics = () => {
  return { type: comicsConstants.RESET };
};

export const getComics = (dispatch, limit, offset) => {
  const request = fetchGetParam(
    apiUrl + `/v1/public/Comics?limit=${limit}&offset=${offset}`
  );

  if (dispatch) dispatch(loadingListComics());
  request
    .then(result => {
      if (result.data.count > 0) dispatch(saveComics(result.data));
      else {
        dispatch(errorComics());
      }
    })
    .catch(e => {
      dispatch(errorComics());
    });
};

export const searchComics = (dispatch, search) => {
  dispatch(loadingListComics());
  const request = fetchGetParam(
    apiUrl + `/v1/public/comics?titleStartsWith=${search}`
  );

  request.then(result => {
    dispatch(saveComics(result.data));
  });
};