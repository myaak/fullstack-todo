import { TodoGroupItemCircle, TodoGroupItemWrapper } from "./TodoGroupItem.styled.ts";
import React from "react";
import { TodoGroup } from "../../types/todoGroup.ts";

interface TodoGroupItemProps {
  group: TodoGroup;
  onDelete: () => void;
}

const TodoGroupItem: React.FC<TodoGroupItemProps> = ({ group, onDelete }) => {
  const { title, color, hoverColor } = group;
  return (
    <>
      <TodoGroupItemWrapper color={color} hoverColor={hoverColor}>
        <TodoGroupItemCircle onClick={onDelete} />
        {title}
      </TodoGroupItemWrapper>
    </>
  );
};

export default React.memo(TodoGroupItem);
