import axios from "axios";
import { PaginatedTodoGroups, TodoGroup } from "../types/todoGroup.ts";
import { Helpers } from "../types/helpers.ts";
import {
  RequestToUpdateTodoParameters,
  UpdatedTodoResponse,
  UpdateTodoParameters
} from "../types/updateTodoParameters.ts";

const serverUrl = "http://localhost:4000/api";

export const getAllTodos = async (): Promise<ITodo[]> => {
  try {
    const response = await axios.get<ITodo[]>(`${serverUrl}/todo`);
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestAddNewTodo = async (title: ITodo["title"]): Promise<ITodo> => {
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

export const requestDeleteTodo = async (id: ITodo["id"]): Promise<ITodo> => {
  try {
    const response = await axios.delete(`${serverUrl}/todo/${id}`); // in progress
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestUpdateTodo = async (
  isForce: boolean,
  params: Helpers<UpdateTodoParameters>,
  todo: ITodo
): Promise<UpdatedTodoResponse> => {
  try {
    const objectToRequestUpdate: RequestToUpdateTodoParameters = {
      isForce: isForce,
      todo: todo,
      params: params
    };

    const response = await axios.patch<UpdatedTodoResponse>(`${serverUrl}/todo/${todo.id}`, objectToRequestUpdate);
    if (response.data.message === "error") {
      throw new Error("Something went wrong");
    }
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestGetAllTodoGroups = async (): Promise<TodoGroup[]> => {
  try {
    const response = await axios.get<TodoGroup[]>(`${serverUrl}/group`);
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestGetSpecificTodoGroupsWithValues = async (groups: ITodo["todo_groups"]): Promise<TodoGroup[]> => {
  try {
    const response = await axios.get<TodoGroup[]>(`${serverUrl}/group/with`, {
      params: {
        groups: groups
      }
    });
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestGetSpecificTodoGroupsWithoutValues = async (groups: ITodo["todo_groups"]): Promise<TodoGroup[]> => {
  try {
    const response = await axios.get<TodoGroup[]>(`${serverUrl}/group/without`, {
      params: {
        groups: groups
      }
    });
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestAddNewTodoGroup = async (todoGroup: Omit<TodoGroup, "id">): Promise<TodoGroup> => {
  try {
    const { title, color, hoverColor } = todoGroup;
    const response = await axios.post<TodoGroup>(`${serverUrl}/group`, {
      title: title,
      color: color,
      hoverColor: hoverColor
    });
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestAddNewGroupToTodo = async (todo: ITodo, groupId: TodoGroup["id"]): Promise<ITodo> => {
  try {
    const response = await axios.patch<ITodo>(`${serverUrl}/todo/${todo.id}/group`, { todo: todo, groupId: groupId });
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestDeleteGroupFromTodo = async (todo: ITodo, groupId: TodoGroup["id"]): Promise<ITodo> => {
  try {
    const response = await axios.delete<ITodo>(`${serverUrl}/todo/${todo.id}/group`, {
      data: { todo: todo, groupId: groupId }
    });
    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};

export const requestNewGroups = async (
  page: number,
  pageSize: number,
  currentGroups: TodoGroup["id"][]
): Promise<PaginatedTodoGroups> => {
  try {
    const response = await axios.get<PaginatedTodoGroups>("http://localhost:4000/api/group", {
      params: {
        page: page,
        pageSize: pageSize,
        currentGroups: currentGroups
      }
    });

    return response.data;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};
