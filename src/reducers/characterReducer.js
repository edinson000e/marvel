import { characterConstants } from "../constants/character.constants";

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
        isFeching: false
      };

    case characterConstants.LOADING_LIST:
      return {
        ...state,
        isFeching: true
      };

    default:
      return state;
  }
};

export default charactersReducer;
