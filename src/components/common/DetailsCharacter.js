import React from "react";
import styled from "styled-components";
import { Breadcrumb } from "./Breadcrumb";

import { MarginMain } from "./Header";
const DetailsCommics = styled.div`
  display: flex;
  flex-direction: row;
  pointer-events: all;
  position: relative;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;
const Details = styled(DetailsCommics)`
  margin: 20px 20px 20px 0;
  :hover {
    background: #f2f2f2;
  }

  :hover img {
    filter: grayscale(60%);
  }
  @media (max-width: 767px) {
    border-bottom: 1px solid #dcdacb;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    padding: 8px;
  }
`;
const StyledPhoto = styled.img`
  width: 80%;
  height: auto;
  object-fit: cover;
  border-radius: 3px;
  display: block;
  transition: opacity linear 100ms;
  margin: auto;
  overflow: hidden;
  @media (max-width: 767px) {
    width: 50%;
  }
`;

const StyledPhotoContainer = styled(StyledPhoto)`
  margin: 0px;
`;
const Title = styled.h4`
  color: ${p => (p.dark ? "#000" : "#fff")};
  font-weight: bold;
  text-transform: capitalize;
  /*@media (max-width: 500px) {
    font-size: 0.5rem;
  }*/
`;

export const TitleDescription = styled.h1`
  color: ${p => (p.dark ? "#000" : "#fff")};
  font-weight: bold;

  text-align: ${p => (p.center ? "center" : "left")};
`;

const ContainerImage = styled.div`
  flex: 25%;
  justify-content: center;
  border-radius: 4px;
  order: -1;
  overflow: hidden;
  display: flex;
`;

const ContainerImageDetails = styled(ContainerImage)`
  /*
  justify-content: flex-start;
*/
  flex: inherit;
  width: 40%;
  margin-top: 3rem;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const ContainerDescription = styled.div`
  width: 60%;

  h4 {
    font-family: "Open Sans";
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Description = styled.p`
  font-weight: 300;
  text-align: justify;
`;

const DescriptionContainer = styled(Description)`
  @media (min-width: 768px) {
    position: absolute;
    background: white;
  }
`;
const ContainerPrincipal = styled.div`
  background: #eeeeee;

  position: absolute;
  left: 0px;
  width: 100%;

  > div {
    z-index: 1;

    ${MarginMain}
    margin: auto;
    justify-content: flex-end;
  }

  @media (max-width: 767px) {
    position: relative;
    background: #fff;
  }
`;

export function DetailsCharacter({ url, title, description, action }) {
  return (
    <Details>
      <ContainerImage>
        <StyledPhoto src={url} />
      </ContainerImage>

      <ContainerDescription>
        <Title dark>{title}</Title>

        <Description>{description}</Description>
      </ContainerDescription>
    </Details>
  );
}

export function CommonDetailsCharacter({
  url,
  title,
  description,
  subTitle,
  actions
}) {
  return (
    <Container>
      <ContainerPrincipal>
        <DetailsCommics>
          <ContainerDescription>
            <Breadcrumb actions={actions} />
            <TitleDescription dark>{title}</TitleDescription>

            {subTitle &&
              subTitle.length > 0 &&
              subTitle.map((value, index) => (
                <Title dark key={index}>
                  {value.item} : {value.name.toString()}
                </Title>
              ))}

            <DescriptionContainer>{description}</DescriptionContainer>
          </ContainerDescription>
        </DetailsCommics>
      </ContainerPrincipal>
      <DetailsCommics>
        <ContainerImageDetails>
          <StyledPhotoContainer src={url} />
        </ContainerImageDetails>
      </DetailsCommics>
    </Container>
  );
}
