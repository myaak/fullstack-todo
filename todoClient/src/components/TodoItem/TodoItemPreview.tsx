import React from "react";
import { TodoInfoWrapper, TodoPreviewTitle, TodoPreviewWrapper } from "./TodoItem.styled.ts";
import StyledCheckbox from "../Checkbox/Checkbox.tsx";

interface TodoItemPreviewProps {
  todo: ITodo;
}

const TodoItemPreview: React.FC<TodoItemPreviewProps> = ({ todo }) => {
  const { title, completed } = todo;
  return (
    <TodoPreviewWrapper>
      <TodoInfoWrapper>
        <StyledCheckbox isChecked={completed} />
        <TodoPreviewTitle>{title}</TodoPreviewTitle>
      </TodoInfoWrapper>
    </TodoPreviewWrapper>
  );
};

export default React.memo(TodoItemPreview);
