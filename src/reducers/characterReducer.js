import { characterConstants } from "../constants/character.constants";
import { initialStateCharacter } from "../store/initialState/character";
const charactersReducer = (state, action) => {
  switch (action.type) {
    case characterConstants.SELECT_CHARACTER:
      return {
        ...state,
        count: action.data.count,
        limit: action.data.limit,
        offset: action.data.offset,
        results: action.data.results,
        total: action.data.total,
        isFetching: false
      };

    case characterConstants.LOADING_LIST_CHARACTER:
      return {
        ...state,
        isFetching: true,
        errorSelect: false
      };

    case characterConstants.ERROR_SELECT:
      return {
        ...state,
        isFetching: false,
        errorSelect: true
      };

    case characterConstants.DATA_SELECT_CHARACTER:
      console.log("characterConstants.DATA_SELECT_CHARACTER", action.data);
      return {
        ...state,
        dataSelect: action.data
      };
    case characterConstants.RESET_SELECT_CHARACTER:
      return initialStateCharacter;
    default:
      return state;
  }
};

export default charactersReducer;
