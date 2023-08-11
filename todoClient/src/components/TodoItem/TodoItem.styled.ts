import { styled } from "styled-components";
import { ITheme } from "../../theme/theme.ts";

export const TodoWrapper = styled.div<ITheme>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.mainBorderColor};
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const TodoPreviewWrapper = styled(TodoWrapper)`
  flex-direction: row;
`;

export const TodoInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: black;
`;
export const TodoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-grow: 1;
`;

export const TodoTitle = styled.div<{ done?: string }>`
  color: ${(props) => (props.done === "true" ? "gray" : "black")};
  text-decoration: ${(props) => (props.done === "true" ? "line-through #000 !important" : "none")};
  transition: text-decoration 0.3s ease;
  &:hover {
    cursor: pointer;
  }
`;

export const TodoPreviewTitle = styled(TodoTitle)`
  text-decoration: none;
`;

export const TodoItemButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;

  @media screen and (max-width: 799px) {
    flex-direction: column;
  }
`;

export const TodoItemEditForm = styled.form`
  width: 100%;
`;

export const EditInput = styled.input<ITheme>`
  width: 100%;
  padding: 5px;
  border: 1px solid ${(props) => props.theme.mainBorderColor};
  border-radius: 8px;

  &:focus {
    outline: 1px solid ${(props) => props.theme.mainBorderColor};
  }
`;
