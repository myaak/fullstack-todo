import { TodoDTO } from "models/todoDTO";

export const areObjectsEqual = (prevTodo: TodoDTO, currentTodo: TodoDTO): boolean => {
  const keys1 = Object.keys(prevTodo) as Array<keyof TodoDTO>;

  for (const key of keys1) {
    if (!(key in currentTodo) || prevTodo[key].toString().toUpperCase() !== currentTodo[key].toString().toUpperCase()) {
      return false;
    }
  }

  return true;
};
