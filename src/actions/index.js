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

export const DataSelectCharacter = data => {
  return { type: characterConstants.DATA_SELECT_CHARACTER, data };
};

export const resetSelectCharacter = () => {
  return { type: characterConstants.RESET_SELECT_CHARACTER };
};
export const getCharacters = dispatch => {
  const request = fetchGet(apiUrl + "/v1/public/characters");
  dispatch(loadingListCharacters());
  request.then(result => {
    dispatch(saveCharacters(result.data));
  });
};

export const searchCommic = (dispatch, comicId) => {
  let id = parseInt(comicId);
  const request = fetchGet(apiUrl + `/v1/public/comics/${id}`);
  request.then(result => {
    dispatch(DataSelectCharacter(result.data.results[0]));
  });
};

export const getDetailsCharacter = async (url, title, dispatch) => {
  dispatch(openModal({ title }));

  try {
    const request = await fetchGet(url);
    const json = await request;
    console.log("josn", json);
    dispatch(SelectCharacter(json.data));
  } catch (e) {
    console.error(e);
  }
};
