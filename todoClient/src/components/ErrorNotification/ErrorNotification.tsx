import { useAppSelector } from "../../store/storeHooks.ts";
import {
  ErrorNotificationContent,
  ErrorNotificationTitle,
  ErrorNotificationWrapper
} from "./ErrorNotification.styled.ts";

const ErrorNotification = () => {
  const todoItemError = useAppSelector((state) => state.todo.todoItemError);
  const todoListError = useAppSelector((state) => state.todo.todoListError);

  return (
    (todoItemError !== "" || todoListError !== "") && (
      <ErrorNotificationWrapper>
        <ErrorNotificationTitle>Server Error</ErrorNotificationTitle>
        <ErrorNotificationContent>{todoItemError}</ErrorNotificationContent>
      </ErrorNotificationWrapper>
    )
  );
};

export default ErrorNotification;
