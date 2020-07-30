import React from "react";
import {
  ContainerSpinner,
  TitleDescription,
  StyledLinkButton,
  Button
} from "./index";
import { Container } from "./Search";
export const ContainerError = ({ title, subTitle, onClick }) => {
  return (
    <ContainerSpinner>
      <Container>
        <TitleDescription dark>{title}</TitleDescription>
        <h2>{subTitle}</h2>
        <StyledLinkButton to={"/"}>
          <Button type="button">Back to home page</Button>
        </StyledLinkButton>
      </Container>
    </ContainerSpinner>
  );
};
