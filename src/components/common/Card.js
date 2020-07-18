import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  background: red;
  border: 1px solid white;
  border-radius: 8px;
  background-image: url(${p => p.src});
  height: 50vh;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: transform 1s;
  :hover {
    background-size: 115% 115%;
    background-position: center;
    filter: grayscale(50%);
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
  }
`;

const Title = styled.h2`
  color: #fff;
  font-weight: 300;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const StyledPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Card = ({ title, photo, actions }) => (
  <StyledContainer src={photo}>
    <Title>{title}</Title>
  </StyledContainer>
);

export { Card };
