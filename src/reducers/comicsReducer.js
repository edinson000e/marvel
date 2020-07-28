import { comicsConstants } from "../constants/comics.constants";
import { initialStateComics } from "../store/initialState/comics";
const comicsReducer = (state, action) => {
  switch (action.type) {
    case comicsConstants.SAVE_LIST:
      return {
        ...state,
        count: action.data.count,
        limit: action.data.limit,
        offset: action.data.offset,
        results: action.data.results,
        total: action.data.total,
        isFetching: false,
        complete: true
      };
    case comicsConstants.LOADING_LIST:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case comicsConstants.ERROR_LIST:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case comicsConstants.RESET:
      return initialStateComics;
    default:
      return state;
  }
};

export default comicsReducer;
