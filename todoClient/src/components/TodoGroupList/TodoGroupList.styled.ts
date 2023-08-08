import { styled } from "styled-components";

export const TodoItemGroupsWrapper = styled.div`
  padding-top: 5px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const TodoItemGroupAddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: max-content;
  text-align: center;
  padding: 2px 8px;
  border-radius: 15px;
  background-color: #8c94e5;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;
  outline: none;
  border: none;

  &::before {
    content: "+";
    font-size: 24px;
    pointer-events: none;
    position: absolute;
  }

  &:hover {
    background-color: #757cc8;
  }
`;
