import styled from "styled-components";
import { AddFormInput } from "../TodoAddForm/TodoAddForm.styled.ts";

export const DropdownContainer = styled.div`
  z-index: 2023;
  position: relative;
  width: 800px;

  @media screen and (max-width: 799px) {
    width: 100%;
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #9ba2ff;
  border-radius: 5px;
`;

export const SearchGroupInputWrapper = styled.div`
  border: 1px solid #9ba2ff;
  border-radius: 5px;
  padding: 5px;
  display: flex;
`;
export const SearchGroupInput = styled(AddFormInput)`
  width: 100%;
  padding: 10px;
  flex-grow: 1;
`;

export const StyledDropdownItem = styled.div`
  padding: 10px;
  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;
