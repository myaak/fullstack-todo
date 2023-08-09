import { TodoGroupItemCircle, TodoGroupItemWrapper } from "./TodoGroupItem.styled.ts";
import React from "react";

interface TodoGroupItemProps {
  title: string;
  onDelete: () => void;
}

const TodoGroupItem: React.FC<TodoGroupItemProps> = ({ title, onDelete }) => {
  return (
    <>
      <TodoGroupItemWrapper>
        <TodoGroupItemCircle onClick={onDelete} />
        {title}
      </TodoGroupItemWrapper>
    </>
  );
};

export default React.memo(TodoGroupItem);
