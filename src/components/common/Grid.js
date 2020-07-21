import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  margin-top: 60px;
`;

const Row = styled.div`
  display: flex;
`;

const Col = styled.div``;

export { Grid, Row, Col };
