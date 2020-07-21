import { searchConstants } from "../constants/search.constants";
import { initialStateSearch } from "../store/initialState/search";
const searchsReducer = (state, action) => {
  switch (action.type) {
    case searchConstants.RESULT:
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
    case searchConstants.RESET:
      return initialStateSearch;
    default:
      return state;
  }
};

export default searchsReducer;
