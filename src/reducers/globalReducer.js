import { globalConstants } from "../constants/global.constants";
import { initialStateGlobal } from "../store/initialState/global";
const globalReducer = (state, action) => {
  switch (action.type) {
    case globalConstants.LOADING:
      return {
        ...state,
        isFetching: true,
        error: false,
        success: false
      };
    case globalConstants.ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        msg: action.data
      };
    case globalConstants.SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true
      };
    case globalConstants.RESET:
      return initialStateGlobal;
    default:
      return state;
  }
};

export default globalReducer;
