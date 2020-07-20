import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";

const DetailsCommics = styled.div`
  display: flex;
  flex-direction: row;
  pointer-events: all;
  position: relative;
`;

const Details = styled(DetailsCommics)`
  margin: 20px 0px;
  :hover {
    background: #f2f2f2;
  }

  :hover img {
    filter: grayscale(60%);
  }
`;
const StyledPhoto = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 3px;
  display: block;
  transition: opacity linear 100ms;
  margin: auto;
  overflow: hidden;
`;

const Title = styled.h4`
  color: ${p => (p.dark ? "#000" : "#fff")};
  font-weight: bold;
  text-transform: capitalize;
  @media (max-width: 500px) {
    font-size: 0.5rem;
  }
`;

const TitleDescription = styled.h1`
  color: ${p => (p.dark ? "#000" : "#fff")};
  font-weight: bold;
`;

const ContainerImage = styled.div`
  flex: 25%;
  margin-right: 1.6rem;
  justify-content: center;
  border-radius: 4px;
  order: -1;
  overflow: hidden;
  display: flex;
`;

const ContainerImageDetails = styled(ContainerImage)`
  flex: 50%;
`;
const ContainerDescription = styled.div`
  flex: 75%;
`;

const Date = styled.div`
  color: #ccc;
  font-weight: 300;
  margin: 6px 0;
`;

const Description = styled.p`
  font-weight: 300;
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
  action
}) {
  return (
    <DetailsCommics>
      <ContainerImageDetails>
        <StyledPhoto src={url} />
      </ContainerImageDetails>

      <ContainerDescription>
        <TitleDescription dark>{title}</TitleDescription>
        {subTitle &&
          subTitle.length > 0 &&
          subTitle.map((value, index) => (
            <Title dark key={index}>
              {value.item} : {value.name.toString()}
            </Title>
          ))}
        <Description>{description}</Description>
      </ContainerDescription>
    </DetailsCommics>
  );
}
