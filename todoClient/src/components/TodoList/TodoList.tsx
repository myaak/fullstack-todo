import { TodoListWrapper } from "./TodoList.styled.ts";
import React from "react";

interface TodoListProps {
  todos: React.ReactNode;
}
const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return <TodoListWrapper>{todos}</TodoListWrapper>;
};

export default React.memo(TodoList);
