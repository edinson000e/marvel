import charactersReducer from "./charactersReducer";
import modalReducer from "./modalReducer";
export const mainReducer = ({ characters, modal }, action) => {
  return {
    characters: charactersReducer(characters, action),
    modal: modalReducer(modal, action)
  };
};
