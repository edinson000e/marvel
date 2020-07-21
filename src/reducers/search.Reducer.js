import { searchConstants } from "../constants/search.constants";

const searchsReducer = (state, action) => {
  switch (action.type) {
    case searchConstants.SAVE_LIST:
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
    default:
      return state;
  }
};

export default searchsReducer;
