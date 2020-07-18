import styled, { css } from "styled-components";
const Logo = styled.img`
  width: 125px;
  height: 50px;
  transition: width 0ms;
  @media (max-width: 768px) {
    ${p =>
      !p.logo &&
      css`
        width: 0px;
        transition: margin -300ms cubic-bezier(0.645, 0.045, 0.355, 1);
        /*visibility: hidden;*/
      `};
  }
`;

export { Logo };
