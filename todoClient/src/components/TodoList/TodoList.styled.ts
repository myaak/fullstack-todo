import { styled } from "styled-components";

export const TodoListWrapper = styled.ul`
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 799px) {
    width: 95%;
  }
`;
