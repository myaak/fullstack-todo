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

export const StyledSelect = styled.select<ITheme>`
  background-color: white;
  border: thin solid ${(props) => props.theme.mainBorderColor};
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  margin: 0;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: linear-gradient(45deg, transparent 50%, ${(props) => props.theme.textColor} 50%),
    linear-gradient(135deg, ${(props) => props.theme.textColor} 50%, transparent 50%),
    linear-gradient(to right, ${(props) => props.theme.mainBgColor}, ${(props) => props.theme.mainBgColor});
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    100% 0;
  background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
  background-repeat: no-repeat;

  &:focus {
    outline: 0;
  }
`;
