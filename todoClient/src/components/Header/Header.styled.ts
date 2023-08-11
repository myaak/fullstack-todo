import { styled } from "styled-components";
import { ITheme } from "../../theme/theme.ts";

export const HeaderWrapper = styled.header<ITheme>`
  background-color: ${(props) => props.theme.mainBgColor};
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;
