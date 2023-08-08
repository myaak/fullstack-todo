import React, { useCallback, useMemo } from "react";
import TodoGroupItem from "../TodoGroupItem/TodoGroupItem.tsx";
import { deleteGroupFromTodoRequest } from "../../store/Reducers/TodoReducer.ts";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks.ts";
import { setActiveAddingTodoId } from "../../store/Reducers/TodoGroupReducer.ts";
import { TodoGroup } from "../../types/todoGroup.ts";
import { TodoItemGroupAddButton, TodoItemGroupsWrapper } from "./TodoGroupList.styled.ts";

interface TodoGroupListProps {
  todo: ITodo;
}

const TodoGroupList: React.FC<TodoGroupListProps> = ({ todo }) => {
  const { id, todo_groups } = todo;

  const activeAddingTodoId = useAppSelector((state) => state.todoGroups.activeAddingTodoId);
  const todoGroups = useAppSelector((state) => state.todoGroups.todoGroups);

  const dispatch = useAppDispatch();

  const handleOnDeleteGroup = useCallback(async (groupId: TodoGroup["id"]) => {
    const requestToDeleteGroupParams = {
      todo: todo,
      groupId: groupId
    };
    await dispatch(deleteGroupFromTodoRequest(requestToDeleteGroupParams));
  }, []);

  const todoGroupItems = useMemo(
    () =>
      todo_groups.map((group: number, index: number) => (
        <TodoGroupItem key={index} title={todoGroups.get(group) ?? ""} onDelete={() => handleOnDeleteGroup(group)} />
      )),

    [todo_groups, todoGroups]
  );
  return (
    <TodoItemGroupsWrapper>
      {todoGroupItems}
      <TodoItemGroupAddButton
        onClick={() => {
          dispatch(setActiveAddingTodoId(activeAddingTodoId === id ? -1 : id));
        }}
      >
        +
      </TodoItemGroupAddButton>
    </TodoItemGroupsWrapper>
  );
};

export default React.memo(TodoGroupList);

//TODO: когда добавил пару штук а потом удалил то удалится все - пофиксить, проблема сто проц на фронте
