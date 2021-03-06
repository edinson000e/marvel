import { initialStateCharacters } from "./characters.js";
import { initialStateCharacter } from "./character.js";
import { initialStateModal } from "./modal";
import { initialStateSearch } from "./search";
import { initialStateComics } from "./comics";
import { initialStateGlobal } from "./global";
export const initialState = {
  characters: initialStateCharacters,
  modal: initialStateModal,
  character: initialStateCharacter,
  search: initialStateSearch,
  comics: initialStateComics,
  global: initialStateGlobal
};
