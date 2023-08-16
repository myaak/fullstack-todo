import { styled } from "styled-components";
import { ITheme } from "../../theme/theme.ts";

export const Button = styled.button<ITheme>`
  border-radius: 8px;
  border: 1px solid transparent;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.mainBgColor};
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: ${(props) => props.theme.hoverTextColor};
    background-color: ${(props) => props.theme.hoverMainBgColor};
    border-color: #646cff;
  }
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #ff6969;
  color: #222;
  transition: background-color 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #cc5050;
  }
`;

export const EditButton = Button;
export const SaveButton = Button;
export const AddButton = Button;
export const ForceUpdate = Button;
export const ReqestUpdate = Button;
export const CancelButton = DeleteButton;
