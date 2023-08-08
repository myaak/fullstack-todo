import {
  EditInput,
  TodoInfo,
  TodoInfoWrapper,
  TodoItemButtonsWrapper,
  TodoItemEditForm,
  TodoItemGroupAddButton,
  TodoItemGroupsWrapper,
  TodoTitle,
  TodoWrapper
} from "./TodoItem.styled.ts";
import React, { FormEvent, useCallback, useState } from "react";
import TodoItemButtons from "./TodoItemButtons.tsx";
import {
  deleteGroupFromTodoRequest,
  removeTodo,
  updateCurrentTodo,
  updateTodoParams,
  updateTodoRequest
} from "../../store/Reducers/TodoReducer.ts";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks.ts";
import TodoGroupItem from "../TodoGroupItem/TodoGroupItem.tsx";
import StyledCheckbox from "../Checkbox/Checkbox.tsx";
import { deleteTodo } from "../../http/API.ts";
import { RequestToUpdateTodoParameters, UpdateTodoParameters } from "../../types/updateTodoParameters.ts";
import DropdownMenu from "../DropdownMenu/DropdownMenu.tsx";
import { setActiveAddingTodoId } from "../../store/Reducers/TodoGroupReducer.ts";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { id, title, completed, todo_groups } = todo;

  const todoGroups = useAppSelector((state) => state.todoGroups.todoGroups);
  const activeAddingTodoId = useAppSelector((state) => state.todoGroups.activeAddingTodoId);
  const isLoadingTodo = useAppSelector((state) => state.todo.isLoadingTodo);

  const dispatch = useAppDispatch();

  const [editing, setEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const isDropdownVisible = (todoId: ITodo["id"]) => activeAddingTodoId === todoId;

  const handleSaveResult = useCallback(
    async (isForce: boolean = false) => {
      if (newTitle === title) {
        setEditing(false);
        return;
      }

      const todoNewParams: UpdateTodoParameters = {
        title: newTitle
      };

      const todoUpdateRequestProps: RequestToUpdateTodoParameters = {
        isForce: isForce,
        params: todoNewParams,
        todo: todo
      };

      await dispatch(updateTodoRequest(todoUpdateRequestProps));
      dispatch(updateTodoParams(todoNewParams));
      dispatch(updateCurrentTodo({ ...todo, title: newTitle }));
      setEditing(false);
    },
    [newTitle]
  );

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
  }, [completed]);

  const handleDeleteItem = useCallback(async () => {
    await deleteTodo(id);
    dispatch(removeTodo(id));
  }, []);
  const handleCancelEditing = useCallback(() => {
    setEditing(false);
    setNewTitle(title);
  }, []);

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
              <StyledCheckbox
                isChecked={completed}
                disabled={isLoadingTodo}
                onCheckboxChange={handleCompletedStatusChange}
              />
              <TodoTitle done={String(completed)} onClick={() => setEditing(true)}>
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
            toggleEdit={() => setEditing(true)}
            cancelEdit={handleCancelEditing}
          />
        </TodoItemButtonsWrapper>
      </TodoInfoWrapper>
      <TodoItemGroupsWrapper>
        {todo_groups.map((group: number, index: number) => (
          <TodoGroupItem
            key={index}
            title={todoGroups.get(group) ?? ""}
            onDelete={() => {
              const requestToDeleteGroupParams = {
                todo: todo,
                groupId: group
              };
              dispatch(deleteGroupFromTodoRequest(requestToDeleteGroupParams));
            }}
          />
        ))}
        <TodoItemGroupAddButton
          onClick={() => {
            dispatch(setActiveAddingTodoId(activeAddingTodoId === id ? -1 : id));
          }}
        >
          +
        </TodoItemGroupAddButton>
      </TodoItemGroupsWrapper>
      {isDropdownVisible(id) && <DropdownMenu todo={todo} />}
    </TodoWrapper>
  );
};

export default React.memo(TodoItem);
