import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import LogoSrc from "../../assets/marvel.svg";

const HeaderWrapper = styled.header`
  /*height: 60px;*/
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 16px;
  position: relative;
  top: 0;
  padding: 20px;
  background: white;
  box-shadow: 0px 0px 8px 0px ${props => props.theme.shadow};
`;

export function Header({}) {
  return (
    <HeaderWrapper>
      <Logo src={LogoSrc} />
    </HeaderWrapper>
  );
}
