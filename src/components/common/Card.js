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
  display: flex;
  align-items: flex-end;

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
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const StyledPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Text = styled.div`
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.04),
    rgba(0, 0, 0, 0.72),
    rgba(0, 0, 0)
  );

  width: 100%;
  padding: 10vh 20px 1vh 20px;
`;

const Card = ({ title, photo, description, actions }) => (
  <StyledContainer src={photo}>
    <Text>
      <Title>{title}</Title>
    </Text>
  </StyledContainer>
);

export { Card };
