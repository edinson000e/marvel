import { charactersConstants } from "../contansts/characters.contansts";
import { fetchGet } from "../api";
export const saveCharacters = data => {
  return { type: charactersConstants.SAVE_LIST, data };
};

export const getCharacters = dispatch => {
  const request = fetchGet("/v1/public/characters");
  request.then(result => {
    dispatch(saveCharacters(result));
    console.log("result", result);
  });
};
