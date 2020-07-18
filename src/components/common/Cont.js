import styled from "styled-components";

const Cont = styled.div`
  margin: 0 auto;
  width: 1010px;
  background: ${p => p.theme.bodyBackgroundColor};

  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: 1170px;
  }

  @media (min-width: 1600px) {
    width: 1250px;
  }
`;

export { Cont };
