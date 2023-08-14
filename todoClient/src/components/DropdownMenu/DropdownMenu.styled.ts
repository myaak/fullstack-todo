import styled from "styled-components";
import { AddFormInput } from "../TodoAddForm/TodoAddForm.styled.ts";
import { ITheme } from "../../theme/theme.ts";
import { ColoredItemsProps } from "../../types/helpers.ts";

export const DropdownContainer = styled.div<ITheme>`
  z-index: ${(props) => props.theme.maxZIndex};
  position: relative;
  width: ${(props) => props.theme.defaultWidth};

  @media screen and (max-width: 799px) {
    width: 100%;
  }
`;

export const DropdownContent = styled.div<ITheme>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 220px;
  overflow-y: scroll;
  background-color: white;
  border: 1px solid ${(props) => props.theme.mainBorderColor};
  border-radius: 5px;
`;

export const SearchGroupInputWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.mainBorderColor};
  border-radius: 5px;
  padding: 5px;
  display: flex;
`;
export const SearchGroupInput = styled(AddFormInput)`
  width: 100%;
  padding: 10px;
  flex-grow: 1;
`;

export const StyledDropdownItem = styled.div<ColoredItemsProps>`
  background-color: ${(props) => props.color};
  padding: 10px;
  &:hover {
    background-color: ${(props) => props.hoverColor};
    cursor: pointer;
  }
`;

export const NoGroupsNotification = styled.div`
  padding: 10px;
`;
