export interface UpdateTodoParameters {
  title?: string;
  completed?: boolean;
}

export interface RequestToUpdateTodoParameters {
  isForce: boolean;
  todo: ITodo;
  params: UpdateTodoParameters;
}

export interface UpdatedTodoResponse {
  message: string;
  todo: ITodo;
}
