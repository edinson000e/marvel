import React from "react";
import { Modal } from "../../components/common";
import { resetSelectCharacter } from "../../actions";
import SelectCharacter from "./selectCharacter";
import { useStateValue } from "../../store";

const ModalDetails = () => {
  const dispatchContext = useStateValue();

  let dispatch;

  if (dispatchContext) dispatch = dispatchContext[1];

  return (
    <Modal onClose={() => dispatch(resetSelectCharacter())}>
      <SelectCharacter />
    </Modal>
  );
};

export default ModalDetails;
