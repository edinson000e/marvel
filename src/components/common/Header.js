import React, { useState, useContext, useCallback } from "react";
import styled, { css } from "styled-components";
import { Logo } from "./Logo";
import { Search } from "./Search";
import LogoSrc from "../../assets/marvel.svg";
import { StyledLinkButton } from "./Link";
export const MarginMain = css`
  width: 1010px;
  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: 1170px;
  }

  @media (min-width: 1600px) {
    width: 1250px;
  }
`;
const HeaderWrapper = styled.header`
  width: 100%;
  box-sizing: border-box;
  top: 0;
  padding: 20px;
  box-shadow: 0px 0px 8px 0px ${props => props.theme.shadow};
`;

const ContainerHeader = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  ${MarginMain}
  margin: auto;
`;
export function Header({}) {
  const [logo, setlogo] = useState(true);
  const memoizedHandleClick = useCallback(e => {
    console.log("e", e);
    setlogo(!e);
  }, []);

  return (
    <HeaderWrapper>
      <ContainerHeader>
        <StyledLinkButton to="/">
          <Logo src={LogoSrc} logo={logo} />
        </StyledLinkButton>
        <Search onClick={e => memoizedHandleClick(e)} />
      </ContainerHeader>
    </HeaderWrapper>
  );
}
