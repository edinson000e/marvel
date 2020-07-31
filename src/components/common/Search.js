import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "./Link";

export const Button = styled.button`
  outline: none;
  border: none;

  background: white;
  cursor:pointer;
 /* pointer-events: ${p => (p.open ? "auto" : "none")};
  cursor: ${p => (p.open ? "pointer" : "none")};*/


`;

const hoverStyles = ({ isActive }) => {
  if (!isActive) {
    return css`
      :hover {
        background: #eee;
        text-decoration: none;
        font-weight: "bolder";
        border-bottom: 5px solid;
      }
    `;
  } else {
    return css`
      :hover {
        pointer-events: none;
        cursor: default;
      }
    `;
  }
};
export const StyledLinkSearch = styled(Link)`
  background: "#fff";
  width: 10rem;
  text-transform: capitalize;
  text-align: center;
  text-decoration: none;
  color: black;
  :visited {
    text-decoration: none;
  }
  border-bottom: ${p => (p.isActive ? "5px solid #ee4327" : " none")};
  font-weight: ${p => (p.isActive ? "bolder" : "300")};

  ${hoverStyles}
`;

export const ContainerLink = styled.div`
  display: flex;
`;

export const Container = styled.div`
  h2 {
    font-family: "Open Sans";
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
  padding: 0.2rem;
  > button {
    padding: 1rem;

    border-left: 2px solid #eee;

    text-transform: uppercase;
    font-weight: bold;
    :hover {
      background: #eee;
    }
  }

  -webkit-box-shadow: 0 4px 6px -6px #222;
  -moz-box-shadow: 0 4px 6px -6px #222;
  box-shadow: 0 4px 6px -6px #222;
  @media (min-width: 768px) {
    max-width: none;
    min-width: 15rem;
    /*margin: 0rem 4rem;*/
    flex-grow: 1;

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
  padding: 1rem;
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

export const SearchWithLink = ({ match }) => {
  const link = [
    { name: "character", pathname: "/search/character" },
    { name: "comic", pathname: "/search/comic" }
  ];
  const { pathname } = useLocation();
  const [state, setstate] = useState("character");

  useEffect(() => {
    console.log("pathname");
    if (pathname !== "/search/" + state) {
      let value = link.find(value => pathname.includes(value.pathname));
      console.log("value", value);
      console.log("value.pathname", pathname);
      if (!value) setstate("character");
      else setstate(value.name);
    }
  }, [pathname, link]);
  return (
    <ContainerSearchWithLink>
      <Search push={state} />
      <ContainerLink>
        {link.map((value, index) => {
          return (
            <StyledLinkSearch
              to={{
                pathname: `${match.path}/${value.name}`
              }}
              isActive={pathname.includes(value.pathname)}
              key={index}
            >
              <p>{value.name}</p>
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
  const match = useRouteMatch(`/search/${push}:id`);

  const [matchValue, setmatchValue] = useState();
  const onFormSubmit = e => {
    e.preventDefault();

    if (input.length > 0) history.push(`/search/${push}=${input}`);
    else if (history.location.pathname !== `/search/${push}`)
      history.push(`/search/${push}`);
    setOpen(false);
  };

  useEffect(() => {
    if (
      match &&
      match.params &&
      match.params.id &&
      matchValue !== match.params.id
    ) {
      setmatchValue(match.params.id);
      if (match && match.params && match.params.id) {
        setInput(match.params.id.slice(1, match.params.id.length));
      } else {
        setInput("");
      }
    }
    if (!match) setInput("");
  }, [match, matchValue]);

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
        Search
      </Button>
    </Form>
  );
};
