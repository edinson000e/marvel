import React from "react";
import styled from "styled-components";
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
`;
