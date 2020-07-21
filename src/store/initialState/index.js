import { initialStateCharacters } from "./characters.js";
import { initialStateCharacter } from "./character.js";
import { initialStateModal } from "./modal";
import { initialStateSearch } from "./search";
export const initialState = {
  characters: initialStateCharacters,
  modal: initialStateModal,
  character: initialStateCharacter,
  search: initialStateSearch
};
