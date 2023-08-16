import { styled } from "styled-components";
import { ITheme } from "../../theme/theme.ts";

export const AddForm = styled.form<ITheme>`
  width: ${(props) => props.theme.defaultWidth};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.mainBorderColor};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;

  @media screen and (max-width: 799px) {
    width: 95%;
  }
`;

export const AddFormInput = styled.input.attrs({ type: "text" })`
  flex-grow: 1;
  padding: 8px;
  border: none;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;
