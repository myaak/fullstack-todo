import { styled } from "styled-components";
import { ColoredItemsProps } from "../../types/helpers.ts";

export const TodoGroupItemWrapper = styled.div<ColoredItemsProps>`
  height: 25px;
  width: max-content;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 10px;
  border-radius: 15px;
  background-color: ${(props) => props.color};
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

export const TodoGroupItemCircle = styled.div`
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #000;
    transform-origin: center;
    visibility: hidden;
    transition: visibility 0.2s ease;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  ${TodoGroupItemWrapper}:hover &::before ,
  ${TodoGroupItemWrapper}:hover &::after {
    visibility: visible;
  }
`;
