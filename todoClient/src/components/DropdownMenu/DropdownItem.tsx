import { StyledDropdownItem } from "./DropdownMenu.styled.ts";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks.ts";
import { addNewGroupToTodoRequest } from "../../store/Reducers/TodoReducer.ts";
import { TodoGroup } from "../../types/todoGroup.ts";
interface DropdownItemProps {
  todo: ITodo;
  id: TodoGroup["id"];
  title: TodoGroup["title"];
}

const DropdownItem: React.FC<DropdownItemProps> = ({ id, title, todo }) => {
  const isLoadingTodo = useAppSelector((state) => state.todo.isLoadingTodo);
  const dispatch = useAppDispatch();

  const handleAddNewGroupToTodo = useCallback(async () => {
    if (isLoadingTodo) return; // чтобы в припадке не добавлял

    const requestParams = {
      todo: todo,
      groupId: id
    };

    await dispatch(addNewGroupToTodoRequest(requestParams));
  }, [isLoadingTodo, todo]);

  return <StyledDropdownItem onClick={handleAddNewGroupToTodo}>{title}</StyledDropdownItem>;
};

export default React.memo(DropdownItem);
