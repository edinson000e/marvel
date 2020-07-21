import { charactersConstants } from "../constants/characters.constants";

const charactersReducer = (state, action) => {
  switch (action.type) {
    case charactersConstants.SAVE_LIST:
      action.data.isFeching = false;
      const returnedTarget = Object.assign(state, action.data);
      return returnedTarget;

    case charactersConstants.LOADING_LIST:
      return {
        ...state,
        isFeching: true,
        error: false
      };
    case charactersConstants.ERROR_LIST:
      return {
        ...state,
        isFeching: false,
        error: true
      };

    default:
      return state;
  }
};

export default charactersReducer;
