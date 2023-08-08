import { styled } from "styled-components";

export const TodoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #9ba2ff;
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

export const EditInput = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #8c94e5;
  border-radius: 8px;

  &:focus {
    outline: 1px solid #8c94e5;
  }
`;

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
