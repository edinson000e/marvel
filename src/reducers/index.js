import charactersReducer from "./charactersReducer";
import characterReducer from "./characterReducer";
import modalReducer from "./modalReducer";
import searchReducer from "./search.Reducer";
export const mainReducer = (
  { characters, modal, character, search },
  action
) => {
  return {
    characters: charactersReducer(characters, action),
    modal: modalReducer(modal, action),
    character: characterReducer(character, action),
    search: searchReducer(search, action)
  };
};
