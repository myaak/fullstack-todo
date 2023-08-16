import {
  NotificationButtonsWrapper,
  NotificationCause,
  NotificationContent,
  NotificationItem,
  NotificationOverlay,
  NotificationTitle
} from "./Notification.styled.ts";
import { ForceUpdate, ReqestUpdate } from "../Buttons/Button.styled.ts";
import TodoItemPreview from "../TodoItem/TodoItemPreview.tsx";
import { RequestToUpdateTodoParameters } from "../../types/updateTodoParameters.ts";
import { resetChangesRequestedId, updateTodo, updateTodoRequest } from "../../store/Reducers/TodoReducer.ts";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks.ts";

const Notification = () => {
  const currentTodo = useAppSelector((state) => state.todo.currentTodo);
  const changedTodo = useAppSelector((state) => state.todo.changedTodo);
  const todoNewParams = useAppSelector((state) => state.todo.todoNewParams);

  const dispatch = useAppDispatch();

  const handleSaveResult = useCallback(
    (isForce: boolean) => {
      const requestUpdateTodo: RequestToUpdateTodoParameters = {
        isForce: isForce,
        params: todoNewParams,
        todo: currentTodo
      };

      dispatch(updateTodoRequest(requestUpdateTodo));
    },
    [currentTodo, todoNewParams]
  );

  return (
    <NotificationOverlay>
      <NotificationContent>
        <NotificationTitle>Notification</NotificationTitle>
        <NotificationCause>This todo was already changed and has this props</NotificationCause>
        <NotificationItem>
          <TodoItemPreview todo={changedTodo} />
        </NotificationItem>
        <NotificationItem>Do you want to keep it or force update your ToDo</NotificationItem>
        <NotificationItem>
          <NotificationCause>Your options</NotificationCause>
          <TodoItemPreview todo={currentTodo} />
        </NotificationItem>
        <NotificationButtonsWrapper>
          <ForceUpdate onClick={() => handleSaveResult(true)}>Force Update</ForceUpdate>
          <ReqestUpdate
            onClick={() => {
              dispatch(updateTodo(changedTodo));
              dispatch(resetChangesRequestedId());
            }}
          >
            Request Update
          </ReqestUpdate>
        </NotificationButtonsWrapper>
      </NotificationContent>
    </NotificationOverlay>
  );
};

export default Notification;
