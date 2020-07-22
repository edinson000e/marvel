import { charactersConstants } from "../constants/characters.constants";
import { characterConstants } from "../constants/character.constants";
import { fetchGet, apiUrl, fetchGetParam } from "../api";
import { openModal } from "./modal";
export const saveCharacters = data => {
  return { type: charactersConstants.SAVE_LIST, data };
};

export const errorCharacters = data => {
  return { type: charactersConstants.ERROR_LIST, data };
};

export const errorCharacterSelect = data => {
  return { type: characterConstants.ERROR_SELECT, data };
};

export const loadingListCharacters = data => {
  return { type: charactersConstants.LOADING_LIST, data };
};

export const selectCharacterLoading = () => {
  return { type: characterConstants.LOADING_LIST_CHARACTER };
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
export const getCharacters = (dispatch, limit, offset) => {
  const request = fetchGetParam(
    apiUrl + `/v1/public/characters?limit=${limit}&offset=${offset}`
  );

  if (dispatch) dispatch(loadingListCharacters());
  request
    .then(result => {
      if (result.data.count > 0) dispatch(saveCharacters(result.data));
      else {
        dispatch(errorCharacters());
      }
    })
    .catch(e => {
      dispatch(errorCharacters());
    });
};

export const searchCommic = (dispatch, comicId) => {
  let id = parseInt(comicId);
  const request = fetchGet(apiUrl + `/v1/public/comics/${id}`);
  request
    .then(result => {
      dispatch(DataSelectCharacter(result.data.results[0]));
    })
    .catch(e => {
      dispatch(errorCharacterSelect());
    });
};

export const getDetailsCharacter = async (url, title, dispatch) => {
  dispatch(openModal({ title }));
  dispatch(selectCharacterLoading());
  try {
    const request = await fetchGet(url);
    const json = await request;
    dispatch(SelectCharacter(json.data));
  } catch (e) {
    console.error(e);
  }
};
