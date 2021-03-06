import charactersReducer from "./charactersReducer";
import characterReducer from "./characterReducer";
import modalReducer from "./modalReducer";
import searchReducer from "./search.Reducer";
import comicsReducer from "./comicsReducer";
import globalReducer from "./globalReducer";
export const mainReducer = (
  { characters, modal, character, search, comics, global },
  action
) => {
  return {
    characters: charactersReducer(characters, action),
    modal: modalReducer(modal, action),
    character: characterReducer(character, action),
    search: searchReducer(search, action),
    comics: comicsReducer(comics, action),
    global: globalReducer(global, action)
  };
};
