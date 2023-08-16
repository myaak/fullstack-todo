import { StyledDropdownItem } from "./DropdownMenu.styled.ts";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks.ts";
import { addNewGroupToTodoRequest, addTodoGroupToExisting } from "../../store/Reducers/TodoReducer.ts";
import { TodoGroup } from "../../types/todoGroup.ts";
interface DropdownItemProps {
  todo: ITodo;
  todoGroup: TodoGroup;
  isExisting: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ todo, todoGroup, isExisting }) => {
  const { id, title, color, hoverColor } = todoGroup;
  const isLoadingTodo = useAppSelector((state) => state.todo.isLoadingTodo);
  const dispatch = useAppDispatch();

  const handleAddNewGroupToTodo = useCallback(async () => {
    if (isLoadingTodo) return; // чтобы в припадке не добавлял

    const requestParams = {
      todo: todo,
      groupId: id
    };

    await dispatch(addNewGroupToTodoRequest(requestParams));
    if (isExisting) return;
    await dispatch(addTodoGroupToExisting(todoGroup));
  }, [isLoadingTodo, todo, todoGroup]);

  return (
    <StyledDropdownItem color={color} hoverColor={hoverColor} onClick={handleAddNewGroupToTodo}>
      {title}
    </StyledDropdownItem>
  );
};

export default React.memo(DropdownItem);
