import ErrorNotification from "../ErrorNotification/ErrorNotification.tsx";
import TodoList from "./TodoList.tsx";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import TodoItem from "../TodoItem/TodoItem.tsx";
import { fetchTodos } from "../../store/Reducers/TodoReducer.ts";
import DropdownFilter from "../DropdownFilter/DropdownFilter.tsx";
import Loader from "../Loader/Loader.tsx";

const TodoListWrapper = () => {
  const { activeAddingTodoId, isLoadingGroups } = useAppSelector((state) => state.todoGroups);
  const { todos, isLoadingTodoList, isFetchedTodos, isFetchedGroups, isChangesRequestedId } = useAppSelector(
    (state) => state.todo
  );
  const dispatch = useAppDispatch();

  const [todoFilter, setTodoFilter] = useState<ITodo["id"] | null>();

  const todoItems = useMemo(
    () =>
      todoFilter
        ? todos.map(
            (item: ITodo) =>
              item.todo_groups.includes(todoFilter) && (
                <TodoItem
                  key={item.id}
                  isChangesRequested={isChangesRequestedId === item.id}
                  isSelected={activeAddingTodoId === item.id}
                  todo={item}
                />
              )
          )
        : todos.map((item: ITodo) => (
            <TodoItem
              key={item.id}
              isChangesRequested={isChangesRequestedId === item.id}
              isSelected={activeAddingTodoId === item.id}
              todo={item}
            />
          )),
    [todos, activeAddingTodoId, isChangesRequestedId, todoFilter]
  );

  const handleOnPress = useCallback((id: number | null) => {
    setTodoFilter(id);
  }, []);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  if (isLoadingTodoList || isLoadingGroups || !isFetchedTodos || !isFetchedGroups) {
    return <Loader />;
  }

  return (
    <>
      <DropdownFilter onPress={handleOnPress} />
      <ErrorNotification />
      <TodoList todos={todoItems} />
    </>
  );
};

// TODO: наверное перенести todoList в отдельный прикол, потому что это все ререндерится потому activeAddingId меняется

export default TodoListWrapper;
