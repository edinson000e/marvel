import styled from "styled-components";

const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);
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
`;

const Row = styled.div`
  display: flex;
`;

const Col = styled.div``;

export { Grid, Row, Col };
