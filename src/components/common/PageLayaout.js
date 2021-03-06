import React from "react";
import styled from "styled-components";
import { Header, MarginMain } from "./Header";
const Content = styled.main`
  margin: auto auto 0px auto;
  /*padding: 100px;*/
  padding-bottom: 60px;
  box-sizing: border-box;
  font-family: "Open Sans";

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Roboto Condensed";
  }
  ${MarginMain}
`;

export function PageLayout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}
