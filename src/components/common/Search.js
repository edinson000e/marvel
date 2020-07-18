import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Button = styled.button`
  outline: none;
  border: none;
  color: white;
  background-color: red;
  pointer-events: ${p => (p.open ? "auto" : "none")};
  cursor: ${p => (p.open ? "pointer" : "none")};
`;

const Form = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: white;
  padding: 1rem;
  height: 1rem;
  border-radius: 10rem;
  width: 20rem;
  @media (max-width: 768px) {
    right: 0;
    padding: 1rem;
    width: ${p => (p.open ? "100%" : "2rem")};
    cursor: ${p => (p.open ? "auto" : "pointer")};
  }
`;

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${p => (p.open ? "0rem" : "0rem")};
  border: none;
  color: red;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: red;
  }
`;

export const Search = ({ onClick }) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef();
  const inputFocus = useRef();
  const [input, setInput] = useState("");
  const onFormSubmit = e => {
    e.preventDefault();
    setInput("");
    setOpen(false);
  };

  return (
    <Form
      open={open}
      ref={formRef}
      onClick={() => {
        setOpen(true);
        onClick(true);
        inputFocus.current.focus();
      }}
      onFocus={() => {
        setOpen(true);
        onClick(true);
        inputFocus.current.focus();
      }}
      onBlur={() => {
        setOpen(false);
        onClick(false);
      }}
      onSubmit={onFormSubmit}
    >
      <Input
        onChange={e => setInput(e.target.value)}
        ref={inputFocus}
        value={input}
        open={open}
        placeholder="Buscar..."
      />
      <Button type="submit" open={open}>
        ic
      </Button>
    </Form>
  );
};
