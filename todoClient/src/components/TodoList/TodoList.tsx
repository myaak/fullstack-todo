import { useAppDispatch, useAppSelector } from "../../store/storeHooks.ts";
import TodoItem from "../TodoItem/TodoItem.tsx";
import { useEffect, useMemo } from "react";
import { fetchTodos } from "../../store/Reducers/TodoReducer.ts";
import { fetchTodoGroups } from "../../store/Reducers/TodoGroupReducer.ts";
import { TodoListWrapper } from "./TodoList.styled.ts";
import ErrorNotification from "../ErrorNotification/ErrorNotification.tsx";

const TodoList = () => {
  const activeAddingTodoId = useAppSelector((state) => state.todoGroups.activeAddingTodoId);
  const isChangesRequestedId = useAppSelector((state) => state.todo.isChangesRequestedId);
  const todos = useAppSelector((state) => state.todo.todos);
  const isLoadingTodoList = useAppSelector((state) => state.todo.isLoadingTodoList);
  const isLoadingGroups = useAppSelector((state) => state.todoGroups.isLoadingGroups);
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

  return (
    !isLoadingTodoList &&
    !isLoadingGroups && (
      <>
        <ErrorNotification />
        <TodoListWrapper>{todoItems}</TodoListWrapper>
      </>
    )
  );
};

export default TodoList;
