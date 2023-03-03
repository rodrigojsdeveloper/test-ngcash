import styled, { keyframes } from "styled-components";

const animacaoForm = keyframes`
    
  from {
    opacity: 0;
    transform: translatey(-50px);
  }
    
  to {
    opacity: 1;
    transform: translateX(0px);
}
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;

  animation: ${animacaoForm} 1s;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
  background: var(--background);
  box-shadow: var(--box-shadow-form) 6px 2px 16px 0px;

  padding: 10px 30px;
  margin: -125px 10px 0 10px;

  & > h2 {
    font-size: 25px;
  }

  & > p {
    margin-top: 15px;
    font-size: 13.5px;

    & > a {
      color: var(--shadow-button-2);

      &:hover {
        text-decoration: underline;
      }
    }
  }

  & > form {
    width: 100%;
    padding-top: 40px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 320px) {
    & > p {
      display: flex;
      flex-direction: column;
      text-align: center;

      & > a {
        margin-top: 3px;
      }
    }
  }
`;

export { Container, animacaoForm };
