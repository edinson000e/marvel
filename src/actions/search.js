import { searchConstants } from "../constants/search.constants";
import { fetchGetParam, apiUrl } from "../api";
export const saveSeacrh = data => {
  return { type: searchConstants.SAVE_LIST, data };
};
export const searchCharacters = (dispatch, search) => {
  const request = fetchGetParam(
    apiUrl + `/v1/public/characters?name=${search}`
  );

  request.then(result => {
    console.log("result", result);
    dispatch(saveSeacrh(result.data));
  });
};
