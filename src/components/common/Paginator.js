import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

import { StyledLinkButton } from "../common";
const Container = styled.ul`
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 4vh;
  a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color 0.3s;
    margin: 0px 4px;
  }
  a .active {
    background-color: #4caf50;
    color: white;
    border: 1px solid #4caf50;
  }
  a:hover:not(.active) {
    background-color: #ddd;
  }

  @media (max-width: 767px) {
    padding: 0px;

    a {
      color: black;
      padding: 4px 5px;
    }
  }
`;

export const Paginator = ({ refElement, pag, data, all }) => {
  const [paginas, setpaginas] = useState(0);
  const [listAllPaginator, setlistAllPaginator] = useState(all);

  useEffect(() => {
    let listAll = all;
    setlistAllPaginator(listAll);
    let validate = Math.ceil(listAll / 20);
    let paginasNew = parseInt(pag);

    if (!paginasNew) paginasNew = 1;
    if (listAll > 0 && Math.ceil(listAll / 20) !== paginasNew) {
      if (paginasNew <= 3) {
        setpaginas(5);
      } else {
        if (paginasNew + 2 > validate) setpaginas(Math.ceil(listAll / 20));
        else setpaginas(paginasNew + 2);
      }
    }

    if (Math.ceil(listAll / 20) === parseInt(pag)) {
      setpaginas(Math.ceil(listAll / 20));
    }
  }, [all, pag]);
  const btnCurrent = pag && parseInt(pag) && parseInt(pag) > 1 && (
    <StyledLinkButton
      to={`/p=${parseInt(pag) - 1}`}
      onClick={() => {
        window.scrollTo(0, refElement.offsetTop);
      }}
    >
      <FontAwesomeIcon icon={faAngleLeft} size="lg" color="#ee4327" />
    </StyledLinkButton>
  );

  const btnSiguiente =
    !parseInt(paginas) ||
    (Math.ceil(listAllPaginator / 20) > parseInt(paginas) + 2 && (
      <StyledLinkButton
        to={`/p=${parseInt(pag) + 1}`}
        onClick={() => {
          window.scrollTo(0, refElement.offsetTop);
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} size="lg" color="#ee4327" />
      </StyledLinkButton>
    ));

  const button_number_start_function = () => {
    const button_number = [];
    if (parseInt(paginas) > 30) {
      return (
        <StyledLinkButton
          to={`/p=1`}
          onClick={() => {
            window.scrollTo(0, refElement.offsetTop);
          }}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} size="lg" color="#ee4327" />
        </StyledLinkButton>
      );
    }
    return button_number;
  };

  const button_number_function = () => {
    const button_number = [];
    let valuePagActive = parseInt(pag);

    if (!valuePagActive) valuePagActive = 1;
    for (let i = parseInt(paginas) - 5; i < parseInt(paginas); i++) {
      button_number.push(
        <StyledLinkButton
          key={i}
          to={`/p=${i + 1}`}
          onClick={() => {
            window.scrollTo(0, refElement.offsetTop);
          }}
          isActive={valuePagActive === i + 1}
        >
          {i + 1}
        </StyledLinkButton>
      );
    }
    return button_number;
  };

  const button_number_end_function = () => {
    if (parseInt(pag) + 15 < Math.ceil(listAllPaginator / 20)) {
      return (
        <StyledLinkButton
          to={`/p=${Math.ceil(listAllPaginator / 20)}`}
          onClick={() => {
            window.scrollTo(0, refElement.offsetTop);
          }}
          disabled
        >
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            size="lg"
            color="#ee4327"
          />
        </StyledLinkButton>
      );
    }
    return null;
  };

  return (
    <Container>
      {Math.ceil(listAllPaginator / 20) > 1 && (
        <>
          {button_number_start_function()}
          {btnCurrent}

          {button_number_function()}

          {btnSiguiente}
          {button_number_end_function()}
        </>
      )}
    </Container>
  );
};
