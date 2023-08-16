import {
  EditInput,
  TodoInfo,
  TodoInfoWrapper,
  TodoItemButtonsWrapper,
  TodoItemEditForm,
  TodoTitle,
  TodoWrapper
} from "./TodoItem.styled.ts";
import React, { FormEvent, useCallback, useState } from "react";
import TodoItemButtons from "./TodoItemButtons.tsx";
import {
  removeTodo,
  updateCurrentTodo,
  updateTodoParams,
  updateTodoRequest
} from "../../store/Reducers/TodoReducer.ts";
import { useAppDispatch } from "../../store/storeHooks.ts";
import StyledCheckbox from "../Checkbox/Checkbox.tsx";
import { requestDeleteTodo } from "../../http/API.ts";
import { RequestToUpdateTodoParameters, UpdateTodoParameters } from "../../types/updateTodoParameters.ts";
import DropdownMenu from "../DropdownMenu/DropdownMenu.tsx";
import TodoGroupList from "../TodoGroupList/TodoGroupList.tsx";
import Notification from "../Notification/Notification.tsx";

interface TodoItemProps {
  todo: ITodo;
  isSelected: boolean;
  isChangesRequested: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, isSelected, isChangesRequested }) => {
  const { id, title, completed } = todo;

  const dispatch = useAppDispatch();

  const [editing, setEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const handleSaveResult = useCallback(
    async (isForce: boolean = false) => {
      const titleWithNoSpaces = newTitle.trim();
      if (titleWithNoSpaces === title) {
        setEditing(false);
        return;
      }

      const todoNewParams: UpdateTodoParameters = {
        title: titleWithNoSpaces
      };

      const todoUpdateRequestProps: RequestToUpdateTodoParameters = {
        isForce: isForce,
        params: todoNewParams,
        todo: todo
      };

      dispatch(updateTodoParams(todoNewParams));
      dispatch(updateCurrentTodo({ ...todo, title: titleWithNoSpaces }));
      await dispatch(updateTodoRequest(todoUpdateRequestProps));
      setEditing(false);
      //TODO: возомжно это можно в танк запихнуть
    },
    [newTitle, title, todo]
  );

  const handleStartEditing = useCallback(() => {
    setNewTitle(title);
    setEditing(true);
  }, [title]);

  const handleCompletedStatusChange = useCallback(async () => {
    const todoNewParams: UpdateTodoParameters = {
      completed: !completed
    };

    const todoUpdateRequestProps: RequestToUpdateTodoParameters = {
      isForce: false,
      params: todoNewParams,
      todo: todo
    };
    dispatch(updateTodoRequest(todoUpdateRequestProps));
    dispatch(updateTodoParams(todoNewParams));
    dispatch(updateCurrentTodo({ ...todo, completed: !completed }));
  }, [completed, todo]);

  const handleDeleteItem = useCallback(async () => {
    try {
      await requestDeleteTodo(id);
      dispatch(removeTodo(id));
    } catch (e) {}
  }, [id]);

  const handleCancelEditing = useCallback(() => {
    setEditing(false);
    setNewTitle(title);
  }, [title]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleSaveResult();
  };

  return (
    <TodoWrapper>
      <TodoInfoWrapper>
        <TodoInfo>
          {editing ? (
            <TodoItemEditForm onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
              <EditInput
                type="text"
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                maxLength={40}
                placeholder={"Edit your todo here..."}
              />
            </TodoItemEditForm>
          ) : (
            <>
              <StyledCheckbox isChecked={completed} onCheckboxChange={handleCompletedStatusChange} />
              <TodoTitle done={String(completed)} onClick={handleStartEditing}>
                {title}
              </TodoTitle>
            </>
          )}
        </TodoInfo>
        <TodoItemButtonsWrapper>
          <TodoItemButtons
            editing={editing}
            saveResult={() => handleSaveResult()}
            deleteItem={handleDeleteItem}
            toggleEdit={handleStartEditing}
            cancelEdit={handleCancelEditing}
          />
        </TodoItemButtonsWrapper>
      </TodoInfoWrapper>
      <TodoGroupList todo={todo} />
      {isSelected && <DropdownMenu todo={todo} />}
      {isChangesRequested && <Notification />}
    </TodoWrapper>
  );
};

export default React.memo(TodoItem);
