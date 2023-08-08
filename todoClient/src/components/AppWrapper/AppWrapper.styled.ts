import { styled } from "styled-components";

export const Main = styled.main`
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media screen and (max-width: 799px) {
    margin: 0;
    width: 100%;
    padding: 20px 0;
  }
`;
