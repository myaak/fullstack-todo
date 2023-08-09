import { useAppDispatch, useAppSelector } from "../../store/storeHooks.ts";
import TodoItem from "../TodoItem/TodoItem.tsx";
import { useEffect, useMemo } from "react";
import { fetchTodos } from "../../store/Reducers/TodoReducer.ts";
import { fetchTodoGroups } from "../../store/Reducers/TodoGroupReducer.ts";
import { TodoListWrapper } from "./TodoList.styled.ts";

const TodoList = () => {
  const activeAddingTodoId = useAppSelector((state) => state.todoGroups.activeAddingTodoId);
  const isChangesRequestedId = useAppSelector((state) => state.todo.isChangesRequestedId);
  const { todos, isLoadingTodoList } = useAppSelector((state) => state.todo);
  const { isLoadingGroups } = useAppSelector((state) => state.todoGroups);
  const dispatch = useAppDispatch();

  const todoItems = useMemo(
    () =>
      todos.map((item: ITodo) => (
        <TodoItem
          key={item.id}
          isChangesRequested={isChangesRequestedId === item.id}
          isSelected={activeAddingTodoId === item.id}
          todo={item}
        />
      )),
    [todos, activeAddingTodoId, isChangesRequestedId]
  );

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchTodoGroups());
  }, []);

  return !isLoadingTodoList && !isLoadingGroups && <TodoListWrapper>{todoItems}</TodoListWrapper>;
};

export default TodoList;
