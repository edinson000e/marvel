import { comicsConstants } from "../constants/comics.constants";

const comicsReducer = (state, action) => {
  switch (action.type) {
    case comicsConstants.SAVE_LIST:
      action.data.isFeching = false;
      const returnedTarget = Object.assign(state, action.data);
      return returnedTarget;

    case comicsConstants.LOADING_LIST:
      return {
        ...state,
        isFeching: true,
        error: false
      };
    case comicsConstants.ERROR_LIST:
      return {
        ...state,
        isFeching: false,
        error: true
      };

    default:
      return state;
  }
};

export default comicsReducer;
