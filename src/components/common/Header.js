import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { Search } from "./Search";
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
  justify-content: space-between;
`;

export function Header({}) {
  const [logo, setlogo] = useState(true);
  const memoizedHandleClick = useCallback(e => {
    console.log("e", e);
    setlogo(!e);
  }, []);

  return (
    <HeaderWrapper>
      <Logo src={LogoSrc} logo={logo} />
      <Search onClick={e => memoizedHandleClick(e)} />
    </HeaderWrapper>
  );
}
