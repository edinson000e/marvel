import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "./Link";

const Button = styled.button`
  outline: none;
  border: none;

  background: white;
  cursor:pointer;
 /* pointer-events: ${p => (p.open ? "auto" : "none")};
  cursor: ${p => (p.open ? "pointer" : "none")};*/


`;

export const StyledLinkSearch = styled(Link)`
  background: "#fff";
  width: 10rem;

  text-align: center;
  text-decoration: none;
  color: black;
  :hover {
    text-decoration: none;
  }
  :visited {
    text-decoration: none;
  }
  border-bottom: ${p => (p.isActive ? "5px solid #ee4327" : " none")};
`;

export const ContainerLink = styled.div`
  display: flex;
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
  /*height: 0.6rem;*/
  /*border-radius: 10rem;*/
  /*width: 20rem;*/
  @media (max-width: 767px) {
     
    padding: 1rem;

 
    /*width: ${p => (p.open ? "90%" : "2rem")};
    cursor: ${p => (p.open ? "auto" : "pointer")};*/
  }
  @media (min-width: 768px) {
    max-width: none;
    min-width: 15rem;
    /*margin: 0rem 4rem;*/
    flex-grow: 1;
    -webkit-box-shadow: 0 4px 6px -6px #222;
     -moz-box-shadow: 0 4px 6px -6px #222;
     box-shadow: 0 4px 6px -6px #222;
    /*border: 1px solid #989586;*/
    /*background-color: #fbfbf8;*/
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
const ContainerSearchWithLink = styled.div`
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.7);
`;
export const SearchIcon = () => {
  return <FontAwesomeIcon icon={faSearch} size="lg" color="#9c9c9c" />;
};

export const SearchWithLink = ({ match, state }) => {
  const link = ["character", "comic"];

  useEffect(() => {
    console.log("state", state);
  }, [state]);
  return (
    <ContainerSearchWithLink>
      <Search push={state} />
      <ContainerLink>
        {link.map((value, index) => {
          return (
            <StyledLinkSearch
              to={{
                pathname: `${match.path}/${value}`
              }}
              key={index}
            >
              <p>{value}</p>
            </StyledLinkSearch>
          );
        })}
      </ContainerLink>
    </ContainerSearchWithLink>
  );
};

export const Search = ({ push }) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef();
  const inputFocus = useRef();
  const [input, setInput] = useState("");
  const history = useHistory();
  const onFormSubmit = e => {
    e.preventDefault();
    setInput("");
    console.log(`esto es un console de push /search/push}=`, push);
    history.push(`/search/${push}=${input}`);
    setOpen(false);
  };

  return (
    <Form
      open={open}
      ref={formRef}
      onClick={() => {
        setOpen(true);
        inputFocus.current.focus();
      }}
      onFocus={() => {
        setOpen(true);
        inputFocus.current.focus();
      }}
      onBlur={() => {
        setOpen(false);
      }}
      onSubmit={onFormSubmit}
    >
      <Input
        onChange={e => setInput(e.target.value)}
        ref={inputFocus}
        value={input}
        open={open}
        placeholder={`Search by ${push}  name...`}
      />
      <Button type="submit" open={open}>
        <SearchIcon />
      </Button>
    </Form>
  );
};
