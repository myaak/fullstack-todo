import { styled } from "styled-components";
import { ITheme } from "../../theme/theme.ts";
import { StyledDropdownItem } from "../DropdownMenu/DropdownMenu.styled.ts";

export const DropdownFilterWrapper = styled.div<ITheme>`
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.mainBorderColor};
  align-self: flex-start;

  width: ${(props) => props.theme.defaultWidth};
  max-height: 250px;
  overflow-y: scroll;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.mainBorderColor};
  border-radius: 5px;
  margin-bottom: 20px;

  @media screen and (max-width: 799px) {
    width: 95%;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const DropdownFilterTitle = styled.div<ITheme>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledDropdownFilterItem = styled(StyledDropdownItem)`
  flex-grow: 1;
`;
