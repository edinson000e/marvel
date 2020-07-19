import { charactersConstants } from "../contansts/characters.contansts";
import { fetchGet, apiUrl } from "../api";
import { openModal } from "./modal";
export const saveCharacters = data => {
  return { type: charactersConstants.SAVE_LIST, data };
};

export const loadingListCharacters = data => {
  return { type: charactersConstants.LOADING_LIST, data };
};

export const getCharacters = dispatch => {
  const request = fetchGet(apiUrl + "/v1/public/characters");
  dispatch(loadingListCharacters());
  request.then(result => {
    dispatch(saveCharacters(result.data));
  });
};

export const getDetailsCharacter = async (url, title, dispatch) => {
  dispatch(openModal(title));

  console.log("rul", url);
  try {
    const request = await fetchGet(url);
    const json = await request;
    console.log("josn", json);
  } catch (e) {
    console.error(e);
  }
};
