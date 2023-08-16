import { useAppSelector } from "../../store/storeHooks.ts";
import {
  ErrorNotificationContent,
  ErrorNotificationTitle,
  ErrorNotificationWrapper
} from "./ErrorNotification.styled.ts";

const ErrorNotification = () => {
  const todoItemError = useAppSelector((state) => state.todo.todoItemError);
  const todoListError = useAppSelector((state) => state.todo.todoListError);
  const todoGroupsError = useAppSelector((state) => state.todoGroups.todoGroupsError);

  return (
    (todoItemError !== "" || todoListError !== "" || todoGroupsError !== "") && (
      <ErrorNotificationWrapper>
        <ErrorNotificationTitle>Server Error</ErrorNotificationTitle>
        <ErrorNotificationContent>{todoItemError}</ErrorNotificationContent>
      </ErrorNotificationWrapper>
    )
  );
};

export default ErrorNotification;
