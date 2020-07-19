import { charactersConstants } from "../constants/characters.constants";
import { characterConstants } from "../constants/character.constants";
import { fetchGet, apiUrl } from "../api";
import { openModal } from "./modal";
export const saveCharacters = data => {
  return { type: charactersConstants.SAVE_LIST, data };
};

export const loadingListCharacters = data => {
  return { type: charactersConstants.LOADING_LIST, data };
};

export const SelectCharacter = data => {
  return { type: characterConstants.SELECT_CHARACTER, data };
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
    dispatch(SelectCharacter(json.data));
  } catch (e) {
    console.error(e);
  }
};
