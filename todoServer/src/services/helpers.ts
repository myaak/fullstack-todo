import { TodoDTO } from "models/todoDTO";

export const areObjectsEqual = (
  prevTodo: TodoDTO, // из базы
  currentTodo: TodoDTO // от клиента
): boolean => {
  const prevTodoKeys = Object.keys(prevTodo) as Array<keyof TodoDTO>;

  for (const key of prevTodoKeys) {
    if (!(key in currentTodo) || prevTodo[key].toString().toUpperCase() !== currentTodo[key].toString().toUpperCase()) {
      return false;
    }
  }

  return true;
};
