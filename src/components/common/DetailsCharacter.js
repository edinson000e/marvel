import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";
import { Breadcrumb } from "./Breadcrumb";
const DetailsCommics = styled.div`
  display: flex;
  flex-direction: row;
  pointer-events: all;
  position: relative;
`;

const Details = styled(DetailsCommics)`
  margin: 20px 20px 20px 0;
  :hover {
    background: #f2f2f2;
  }

  :hover img {
    filter: grayscale(60%);
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

const TitleDescription = styled.h1`
  color: ${p => (p.dark ? "#000" : "#fff")};
  font-weight: bold;
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
`;
const ContainerDescription = styled.div`
  width: 60%;

  h4 {
    font-family: "Open Sans";
  }
`;

const Date = styled.div`
  color: #ccc;
  font-weight: 300;
  margin: 6px 0;
`;

const Description = styled.p`
  font-weight: 300;
  text-align: justify;
`;

const DescriptionContainer = styled(Description)`
  position: absolute;
  background: white;
`;
const ContainerPrincipal = styled.div`
  background: #eeeeee;

  position: absolute;
  left: 0px;
  width: 100%;

  > div {
    z-index: 1;
    width: 1250px;
    margin: auto;
    justify-content: flex-end;
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
    <>
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
    </>
  );
}
