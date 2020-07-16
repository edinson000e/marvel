import charactersReducer from "./charactersReducer";
export const mainReducer = ({ characters }, action) => {
  return { characters: charactersReducer(characters, action) };
};
