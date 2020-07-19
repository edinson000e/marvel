import React, { useRef, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { useStateValue } from "../../store";
import { Title } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const fadeIn = keyframes`from { opacity: 0; }`;

const Overlay = styled.div`
  animation: ${fadeIn} 200ms ease-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

const Dialog = styled.div`
  background: white;
  border-radius: 5px;
  padding: 20px;
  position: absolute;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 100%;
  max-width: 450px;
  height: 500px;
  display: flex;
  background: #fff;
`;

const Header = styled.div`
  justify-content: space-between;
  width: inherit;
  height: fit-content;
  display: flex;
`;

export function Modal({ onClose, children, ...props }) {
  const [{ modal }] = useStateValue();

  return modal.ref
    ? ReactDOM.createPortal(
        <Overlay>
          <Dialog {...props}>
            <Header>
              <Title dark>Spider-man</Title>

              <FontAwesomeIcon
                icon={faTimes}
                onClick={onClose}
                size="lg"
                color="#9c9c9c"
              />
            </Header>

            {children}
          </Dialog>
        </Overlay>,
        modal.ref
      )
    : null;
}
