import { charactersConstants } from "../contansts/characters.contansts";
import { fetchGet } from "../api";
export const saveCharacters = data => {
  return { type: charactersConstants.SAVE_LIST, data };
};

export const loadingListCharacters = data => {
  return { type: charactersConstants.LOADING_LIST, data };
};

export const getCharacters = dispatch => {
  const request = fetchGet("/v1/public/characters");
  dispatch(loadingListCharacters());
  request.then(result => {
    console.log("result", result);
    dispatch(saveCharacters(result.data));
  });
};
