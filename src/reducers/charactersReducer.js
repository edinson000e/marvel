import { charactersConstants } from "../contansts/characters.contansts";

const charactersReducer = (state, action) => {
  switch (action.type) {
    case charactersConstants.SAVE_LIST:
      action.data.isFeching = false;
      const returnedTarget = Object.assign(state, action.data);
      return returnedTarget;

    case charactersConstants.LOADING_LIST:
      return {
        ...state,
        isFeching: true
      };

    default:
      return state;
  }
};

export default charactersReducer;
