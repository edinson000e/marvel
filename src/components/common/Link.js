import React from "react";
import styled, { css } from "styled-components";
import { Link as ReactRouterDomLink } from "react-router-dom";

const Link = ({ children, ...props }) => {
  return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};
export const StyledLinkButton = styled(Link)`
  text-decoration: none;
  color: black;
  :hover {
    text-decoration: none;
  }
  :visited {
    text-decoration: none;
  }
  border-bottom: ${p => (p.isActive ? "5px solid #ee4327" : " none")};

  ${p =>
    p.isActive &&
    css`
      pointer-events: none;
      cursor: default;
      text-decoration: none;
      color: black;
    `}
`;
