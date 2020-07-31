import React from "react";
import { Button } from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export const ButtonCloseC = styled(Button)`
  padding: 0px 1rem;
`;

export const CloseButton = ({ onClick }) => {
  return (
    <ButtonCloseC
      type="submit"
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <FontAwesomeIcon icon={faTimes} size="lg" color="#9c9c9c" />
    </ButtonCloseC>
  );
};
