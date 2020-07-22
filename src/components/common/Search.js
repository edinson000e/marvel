import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Button = styled.button`
  outline: none;
  border: none;

  background: white;
  pointer-events: ${p => (p.open ? "auto" : "none")};
  cursor: ${p => (p.open ? "pointer" : "none")};
`;

export const Container = styled.div`
  h2 {
    font-family: "Open Sans" !important;
    font-weight: 300;
    text-align: center;
  }
`;
const Form = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 1rem;
  height: 0.6rem;
  border-radius: 10rem;
  width: 20rem;
  @media (max-width: 767px) {
    right: 0;
    padding: 1rem;

    position: absolute;
    width: ${p => (p.open ? "90%" : "2rem")};
    cursor: ${p => (p.open ? "auto" : "pointer")};
  }
  @media (min-width: 768px) {
    max-width: none;
    min-width: 15rem;
    margin: 0rem 4rem;
    flex-grow: 1;
    border: 1px solid #989586;
    border-radius: 9999px;
    background-color: #fbfbf8;
  }
`;

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${p => (p.open ? "0rem" : "0rem")};
  border: none;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: #989586;
  }
`;

export const Search = ({ onClick }) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef();
  const inputFocus = useRef();
  const [input, setInput] = useState("");
  const history = useHistory();
  const onFormSubmit = e => {
    e.preventDefault();
    setInput("");

    history.push(`/search/q=${input}`);
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
        placeholder="Search by character name..."
      />
      <Button type="submit" open={open}>
        <FontAwesomeIcon icon={faSearch} size="lg" color="#9c9c9c" />
      </Button>
    </Form>
  );
};
