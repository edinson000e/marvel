import React from "react";
import styled from "styled-components";

const MessageTitle = styled.p`
  text-align: center;
`;

export const Message = ({ title }) => {
  return <MessageTitle>There's no {title} search</MessageTitle>;
};
