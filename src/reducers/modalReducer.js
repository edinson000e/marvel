import { modalConstants } from "../contansts/modal.contansts";
import { initialStateModal } from "../store/initialState/modal";
export default function(state, action) {
  switch (action.type) {
    case modalConstants.REFMODAL:
      return {
        ...state,
        ref: action.data
      };
    case modalConstants.SHOWMODAL:
      console.log("me llamaron modal Const");
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
      return initialStateModal;
    case modalConstants.LOADING:
      return {
        ...state,
        isFeching: true
      };
    case modalConstants.FAILURE:
      return {
        ...state,
        error: true,
        message: action.message,
        option: null
      };
    case modalConstants.RESET:
      return {
        ...state,
        error: false,
        isFeching: false,
        message: null
      };
    case modalConstants.SUCCESS:
      return initialStateModal;
    default:
      return state;
  }
}
