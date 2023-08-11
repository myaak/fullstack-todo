import { styled } from "styled-components";
import { ITheme } from "../../theme/theme.ts";

export const TodoListWrapper = styled.ul<ITheme>`
  width: ${(props) => props.theme.defaultWidth};
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 799px) {
    width: 95%;
  }
`;
