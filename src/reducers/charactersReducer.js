import { charactersConstants } from "../constants/characters.constants";

const charactersReducer = (state, action) => {
  switch (action.type) {
    case charactersConstants.SAVE_LIST:
      action.data.isFetching = false;
      const returnedTarget = Object.assign(state, action.data);
      return returnedTarget;

    case charactersConstants.LOADING_LIST:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case charactersConstants.ERROR_LIST:
      return {
        ...state,
        isFetching: false,
        error: true
      };

    default:
      return state;
  }
};

export default charactersReducer;
