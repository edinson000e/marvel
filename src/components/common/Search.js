import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Button = styled.button`
  outline: none;
  border: none;
  color: white;
  background-color: red;
`;

const Form = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  height: 1rem;
  border-radius: 10rem;
`;

export const Search = () => {
  return (
    <Form>
      <Button type="submit">i</Button>;
    </Form>
  );
};
