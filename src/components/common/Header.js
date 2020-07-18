import React, { useState, useContext } from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 16px;
  position: relative;
  top: 0;
  background: white;
  box-shadow: 0px 0px 8px 0px ${props => props.theme.shadow};
`;

export function Header({}) {
  return <HeaderWrapper></HeaderWrapper>;
}
