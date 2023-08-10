import axios from "axios";
import { TodoGroup } from "../types/todoGroup.ts";
import { AtLeastOne } from "../types/AtLeastOne.ts";
import {
  RequestToUpdateTodoParameters,
  UpdatedTodoResponse,
  UpdateTodoParameters
} from "../types/updateTodoParameters.ts";

const serverUrl = "http://localhost:4000/api";

export const getAllTodos = async (): Promise<ITodo[] | Error> => {
  try {
    const response = await axios.get<ITodo[]>(`${serverUrl}/todo`);
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const addNewTodo = async (title: ITodo["title"]): Promise<ITodo | Error> => {
  try {
    const newTodoTitle = {
      title: title
    };

    const response = await axios.post<ITodo>(`${serverUrl}/todo`, newTodoTitle);
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const deleteTodo = async (id: ITodo["id"]): Promise<ITodo | Error> => {
  try {
    const response = await axios.delete(`${serverUrl}/todo/${id}`); // in progress
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestUpdateTodo = async (
  isForce: boolean,
  params: AtLeastOne<UpdateTodoParameters>,
  todo: ITodo
): Promise<UpdatedTodoResponse | Error> => {
  try {
    const objectToRequestUpdate: RequestToUpdateTodoParameters = {
      isForce: isForce,
      todo: todo,
      params: params
    };

    const response = await axios.patch<UpdatedTodoResponse>(`${serverUrl}/todo/${todo.id}`, objectToRequestUpdate);
    if (response.data.message === "error") {
      return new Error("Something went wrong");
    }
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestGetAllTodoGroups = async (): Promise<TodoGroup[] | Error> => {
  try {
    const response = await axios.get<TodoGroup[]>(`${serverUrl}/group`);
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestAddNewTodoGroup = async (title: TodoGroup["title"]): Promise<TodoGroup | Error> => {
  try {
    const response = await axios.post<TodoGroup>(`${serverUrl}/group`, { title: title });
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestAddNewGroupToTodo = async (todo: ITodo, groupId: TodoGroup["id"]): Promise<ITodo | Error> => {
  try {
    const response = await axios.patch<ITodo>(`${serverUrl}/todo/${todo.id}/group`, { todo: todo, groupId: groupId });
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestDeleteGroupFromTodo = async (todo: ITodo, groupId: TodoGroup["id"]): Promise<ITodo | Error> => {
  try {
    const response = await axios.delete<ITodo>(`${serverUrl}/todo/${todo.id}/group`, {
      data: { todo: todo, groupId: groupId }
    });
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};
