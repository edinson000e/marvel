import styled, { keyframes } from "styled-components";
const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }
    
    to{
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  height: 5rem;
  width: 5rem;
  border: 3px solid ${p => p.theme.primaryColor};
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 16px auto;
  animation: ${rotation} 1s linear infinite;
`;

const ContainerSpinner = styled.div`
  display: flex;
  height: -webkit-fill-available;
  align-items: inherit;
  justify-content: center;
`;
export { Spinner, ContainerSpinner };
