import { TodoDTO } from "models/todoDTO";

export interface UpdateTodoParameters {
  title?: string;
  completed?: string;
}

export interface UpdatedTodoResponse {
  message: string;
  todo: TodoDTO;
}
