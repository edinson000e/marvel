import { searchConstants } from "../constants/search.constants";
import { fetchGetParam, apiUrl } from "../api";
export const saveSearch = data => {
  return { type: searchConstants.RESULT, data };
};

export const resetSearch = () => {
  return { type: searchConstants.RESET };
};
export const searchCharacters = (dispatch, search) => {
  const request = fetchGetParam(
    apiUrl + `/v1/public/characters?name=${search}`
  );

  request.then(result => {
    dispatch(saveSearch(result.data));
  });
};
