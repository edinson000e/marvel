import charactersReducer from "./charactersReducer";
import characterReducer from "./characterReducer";
import modalReducer from "./modalReducer";
export const mainReducer = ({ characters, modal, character }, action) => {
  return {
    characters: charactersReducer(characters, action),
    modal: modalReducer(modal, action),
    character: characterReducer(character, action)
  };
};
