import { modalConstants } from "../constants/modal.constants";

export const initRefModal = data => {
  return { type: modalConstants.REFMODAL, data };
};

export const openModal = data => {
  return { type: modalConstants.SHOWMODAL, data };
};
export const closeModal = () => {
  return { type: modalConstants.HIDDENMODAL };
};
