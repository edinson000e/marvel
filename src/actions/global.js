import { globalConstants } from "../constants/global.constants";

export const error = data => {
  return { type: globalConstants.ERROR, data };
};

export const loading = () => {
  return { type: globalConstants.LOADING };
};

export const reset = () => {
  return { type: globalConstants.RESET };
};

export const success = () => {
  return { type: globalConstants.SUCCESS };
};
