import React from "react";
import styled from "styled-components";
const StyledContainer = styled.div`
  border-radius: 8px;
  background-image: url(${p => p.src});
  height: auto;
  min-height: 380px;
  /*max-width: 300px;*/
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: transform 1s;
  display: flex;
  align-items: flex-end;
  width: 100%;
  width: -moz-available; /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  width: fill-available;
  margin: auto;
  box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.7), 0 3px 0px 0 rgba(0, 0, 0, 0.7);

  opacity: 1;
  :hover {
    background-size: 115% 115%;
    background-position: center;
    filter: grayscale(80%);
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
  }
`;

export const Title = styled.h2`
  color: ${p => (p.dark ? "#000" : "#fff")};
  font-weight: bold;
  text-align: center;
`;

const Text = styled.div`
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.04),
    rgba(0, 0, 0, 0.72),
    rgba(0, 0, 0)
  );
  border-radius: inherit;
  width: 100%;
  padding: 10vh 20px 1vh 20px;
`;

const Card = ({ title, photo, onClick }) => {
  return (
    <StyledContainer src={photo} onClick={onClick}>
      <Text>
        <Title>{title}</Title>
      </Text>
    </StyledContainer>
  );
};

export { Card };
