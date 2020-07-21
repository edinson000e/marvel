import React from "react";
import { Modal } from "../common";
import { resetSelectCharacter } from "../../actions";
import SelectCharacter from "./selectCharacter";
import { useStateValue } from "../../store";

const ModalDetails = () => {
  const [{ characters, modal }, dispatch] = useStateValue();

  return (
    <Modal onClose={() => dispatch(resetSelectCharacter())}>
      <SelectCharacter />
    </Modal>
  );
};

export default ModalDetails;
