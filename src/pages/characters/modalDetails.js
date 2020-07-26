import React from "react";
import { Modal } from "../../components/common";
import { resetSelectCharacter } from "../../actions";
import SelectCharacter from "./selectCharacter";
import { useStateValue } from "../../store";

const ModalDetails = () => {
  const dispatch = useStateValue()[1];

  return (
    <Modal onClose={() => dispatch(resetSelectCharacter())}>
      <SelectCharacter />
    </Modal>
  );
};

export default ModalDetails;
