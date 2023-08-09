import { TodoDTO } from "models/todoDTO";

export interface UpdateTodoParameters {
  title?: string;
  completed?: boolean;
}

export interface UpdatedTodoResponse {
  message: string;
  todo: TodoDTO;
}
