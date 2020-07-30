import React, { useState } from "react";
import styled from "styled-components";

export const Checkbox = styled.button`
  color: #444;
  cursor: pointer;
  background: transparent;
  border: none;
  text-align: left;
  outline: none;
  transition: 0.4s;
  width: 100%;
  padding: 10px 1rem;
`;

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid #ee4327;
  font-weight: bold;
  cursor: pointer;
  &:after {
    content: "\u25BA";
    transform: ${props => (props.isExpanded ? "rotate(90deg)" : "none")};
    transition: 100ms linear all;
    font-size: xx-large;
    margin: auto 0px;
  }
`;
const Title = styled.h2`
  font-family: "Open Sans";
  font-weight: bold;
  text-align: center;
`;
const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.7);
  transition: all 0.3s;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const Body = styled.div`
  border-top: none;
  opacity: ${props => (props.open ? "1" : "0")};
  max-height: ${props => (props.open ? "100%" : "0")};
  overflow: hidden;
  padding: ${props => (props.open ? "15px" : "0 15px")};
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
  }
`;

export const Accordion = ({ children, title }) => {
  const [open, setopen] = useState(false);

  return (
    <Container>
      <Header>
        <Checkbox type="button" onClick={() => setopen(prev => !prev)}>
          <Label isExpanded={open}>
            <Title>{title}</Title>
          </Label>
        </Checkbox>
      </Header>

      <Body open={open}>{children}</Body>
    </Container>
  );
};
export default {
  Accordion
};
