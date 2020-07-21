import React from "react";
import styled from "styled-components";
import { StyledLinkButton } from "./Link";
const BreadcrumbContainer = styled.ul`
  padding: 10px 16px;
  list-style: none;
  background-color: #eee;
`;

const BreadcrumbLi = styled.li`
  display: inline;
  font-size: 18px;
  & + li:before {
    content: "/";
    padding: 8px;
    color: black;
  }
  a {
    color: #0275d8;
    text-decoration: none;
    text-transform: capitalize;
  }
  a:hover {
    color: #01447e;
    text-decoration: underline;
  }
`;

const Breadcrumb = ({ actions }) => (
  <BreadcrumbContainer>
    <BreadcrumbLi>
      <StyledLinkButton to={"/"}>home</StyledLinkButton>
    </BreadcrumbLi>
    {actions.map(({ path, text }, index) => {
      console.log("index", index);
      console.log("actions.length", actions.length);
      return (
        <BreadcrumbLi>
          {index === actions.length - 1 ? (
            text
          ) : (
            <StyledLinkButton to={path}>{text}</StyledLinkButton>
          )}
        </BreadcrumbLi>
      );
    })}
  </BreadcrumbContainer>
);

export { Breadcrumb };
