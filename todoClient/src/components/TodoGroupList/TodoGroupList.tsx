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

  const todosActiveGroupsList = useAppSelector((state) => state.todo.todosActiveGroupsList);

  const dispatch = useAppDispatch();

  const handleOnDeleteGroup = useCallback(
    async (groupId: TodoGroup["id"]) => {
      const requestToDeleteGroupParams = {
        todo: todo,
        groupId: groupId
      };
      await dispatch(deleteGroupFromTodoRequest(requestToDeleteGroupParams));
    },
    [todo]
  );

  const todoGroupItems = useMemo(
    () =>
      todo_groups.map((group: number, index: number) => {
        const groupItem = todosActiveGroupsList.find((item: TodoGroup) => item.id === group);
        if (groupItem) {
          return <TodoGroupItem key={index} group={groupItem} onDelete={() => handleOnDeleteGroup(group)} />;
        }
        return null;
      }),

    [todo_groups, todosActiveGroupsList]
  );
  return (
    <TodoItemGroupsWrapper>
      {todoGroupItems}
      <TodoItemGroupAddButton
        onClick={() => {
          dispatch(setActiveAddingTodoId(id));
        }}
      >
        +
      </TodoItemGroupAddButton>
    </TodoItemGroupsWrapper>
  );
};

export default React.memo(TodoGroupList);
