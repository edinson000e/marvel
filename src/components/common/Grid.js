import styled, { css } from "styled-components";

const Grid = styled.div`
  display: grid;

  grid-template-columns: ${p =>
    p.total > 1 || !p.total ? "repeat(4, 1fr)" : "1fr 2fr 1fr"};
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  margin-top: 2rem;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }

  ${p =>
    p.total === 1 &&
    css`
      > div {
        grid-column-start: 2;
        grid-column-end: 3;
        display: grid;
        grid-template-columns: 0.5fr 1fr 0.5fr;
        @media (max-width: 1200px) {
          /* grid-template-columns: repeat(3, 1fr);*/
        }

        @media (max-width: 768px) {
          grid-column-start: 1;
          grid-column-end: 2;
        }

        @media (max-width: 599px) {
          /*grid-template-columns: 1fr;*/
        }

        > div {
          grid-column-start: 2;
          grid-column-end: 3;
          @media (max-width: 1200px) {
            grid-column-start: 1;
            grid-column-end: 4;
          }
        }
      }
    `};
`;

const Row = styled.div`
  display: flex;
`;

const Col = styled.div``;

export { Grid, Row, Col };
