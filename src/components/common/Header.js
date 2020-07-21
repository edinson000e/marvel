import React, { useState, useContext, useCallback } from "react";
import styled, { css } from "styled-components";
import { Logo } from "./Logo";
import { Search } from "./Search";
import LogoSrc from "../../assets/marvel.svg";
import { StyledLinkButton } from "./Link";
export const MarginMain = css`
  align-items: center;
  @media (max-width: 768px) {
    margin: 1rem 1rem;
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
  @media (max-width: 768px) {
    padding: 1px 0px;
  }
  box-shadow: 0px 0px 8px 0px ${props => props.theme.shadow};
`;

const ContainerHeader = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  ${MarginMain}
  margin: auto;
  @media (max-width: 767px) {
    justify-content: center;
  }
`;
export function Header({}) {
  const [logo, setlogo] = useState(true);
  const memoizedHandleClick = useCallback(e => {
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
