import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { StyledLinkButton } from "../common";
const Container = styled.ul`
  display: inline-flex;
  justify-content: center;

  align-items: center;
  a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color 0.3s;
    border: 1px solid #ddd;
    margin: 0 4px;
  }
  a .active {
    background-color: #4caf50;
    color: white;
    border: 1px solid #4caf50;
  }
  a:hover:not(.active) {
    background-color: #ddd;
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
      if (paginasNew <= 5) {
        setpaginas(9);
      } else {
        if (paginasNew + 4 > validate) setpaginas(Math.ceil(listAll / 20));
        else setpaginas(paginasNew + 4);
      }
    }
  }, [all, pag]);
  const btnCurrent = pag && parseInt(pag) && parseInt(pag) > 1 && (
    <StyledLinkButton
      to={`/p=${parseInt(pag) - 1}`}
      onClick={() => {
        window.scrollTo(0, refElement.offsetTop);
      }}
    >
      {" "}
      &laquo;
    </StyledLinkButton>
  );

  const btnSiguiente =
    !parseInt(paginas) ||
    (Math.ceil(listAllPaginator / 20) > parseInt(paginas) + 4 && (
      <StyledLinkButton
        to={`/p=${parseInt(pag) + 1}`}
        onClick={() => {
          window.scrollTo(0, refElement.offsetTop);
        }}
      >
        &raquo;
      </StyledLinkButton>
    ));

  const button_number_start_function = () => {
    const button_number = [];
    if (parseInt(paginas) > 30) {
      for (let i = 0; i < 3; i++) {
        button_number.push(
          <StyledLinkButton
            key={i}
            to={`/p=${i + 1}`}
            onClick={() => {
              window.scrollTo(0, refElement.offsetTop);
            }}
          >
            {i + 1}
          </StyledLinkButton>
        );
      }
      button_number.push(
        <FontAwesomeIcon
          icon={faEllipsisH}
          size="lg"
          color="#ee4327"
          style={{ margin: "0px 1rem" }}
        />
      );
    }
    return button_number;
  };

  const button_number_function = () => {
    const button_number = [];
    for (let i = parseInt(paginas) - 9; i < parseInt(paginas); i++) {
      button_number.push(
        <StyledLinkButton
          key={i}
          to={`/p=${i + 1}`}
          onClick={() => {
            window.scrollTo(0, refElement.offsetTop);
          }}
        >
          {i + 1}
        </StyledLinkButton>
      );
    }
    return button_number;
  };

  const button_number_end_function = () => {
    const button_number = [];

    if (parseInt(pag) + 15 < Math.ceil(listAllPaginator / 20))
      button_number.push(
        <FontAwesomeIcon
          icon={faEllipsisH}
          size="lg"
          color="#ee4327"
          style={{ margin: "0px 1rem" }}
        />
      );
    for (
      let i = Math.ceil(listAllPaginator / 20) - 3;
      i < Math.ceil(listAllPaginator / 20);
      i++
    ) {
      button_number.push(
        <StyledLinkButton
          key={i}
          to={`/p=${i + 1}`}
          onClick={() => {
            window.scrollTo(0, refElement.offsetTop);
          }}
        >
          {i + 1}
        </StyledLinkButton>
      );
    }
    return button_number;
  };

  return (
    <Container>
      {Math.ceil(listAllPaginator / 20) > 1 && (
        <>
          {btnCurrent}
          {button_number_start_function()}
          {button_number_function()}

          {button_number_end_function()}
          {btnSiguiente}
        </>
      )}
    </Container>
  );
};
