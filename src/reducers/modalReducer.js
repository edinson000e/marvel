import { modalConstants } from "../constants/modal.constants";
import { initialStateModal } from "../store/initialState/modal";
export default function(state, action) {
  switch (action.type) {
    case modalConstants.REFMODAL:
      return {
        ...state,
        ref: action.data
      };
    case modalConstants.SHOWMODAL:
      let send = state.send;

      if (typeof action.data.send !== "undefined") send = action.data.send;
      else send = true;

      return {
        ...state,
        modal: true,
        title: action.data.title,
        className: action.data.itemClassName,
        send: send
      };
    case modalConstants.UPDATEMODAL:
      let newObject = Object.assign(state, action.data);

      return newObject;
    case modalConstants.HIDDENMODAL:
      let initialHidden = { ...initialStateModal };
      delete initialHidden.ref;
      return {
        ...state,
        ...initialHidden
      };

    case modalConstants.LOADING:
      return {
        ...state,
        isFetching: true
      };
    case modalConstants.FAILURE:
      return {
        ...state,
        error: true,
        message: action.message,
        option: null
      };
    case modalConstants.RESETMODAL:
      return {
        ...state,
        error: false,
        isFetching: false,
        message: null
      };

    default:
      return state;
  }
}
