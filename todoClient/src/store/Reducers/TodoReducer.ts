import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllTodos,
  requestAddNewGroupToTodo,
  requestDeleteGroupFromTodo,
  requestUpdateTodo
} from "../../http/API.ts";
import {
  RequestToUpdateTodoParameters,
  UpdatedTodoResponse,
  UpdateTodoParameters
} from "../../types/updateTodoParameters.ts";
import { AtLeastOne } from "../../types/AtLeastOne.ts";
import { TodoGroup } from "../../types/todoGroup.ts";

interface IState {
  todos: ITodo[];
  changedTodo: ITodo;
  currentTodo: ITodo;
  todoNewParams: AtLeastOne<UpdateTodoParameters>;
  isLoadingTodoList: boolean;
  isLoadingTodo: boolean;
  isFetched: boolean;
  isChangesRequested: boolean;
  todoItemError: string;
  todoListError: string;
}

const initialState: IState = {
  todos: [],
  changedTodo: {
    id: -1,
    title: "",
    completed: false,
    todo_groups: []
  },
  currentTodo: {
    id: -1,
    title: "",
    completed: false,
    todo_groups: []
  },
  todoNewParams: {},
  isLoadingTodoList: false,
  isLoadingTodo: false,
  isFetched: false,
  isChangesRequested: false,
  todoItemError: "",
  todoListError: ""
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.unshift(action.payload);
    },
    removeTodo(state, action: PayloadAction<ITodo["id"]>) {
      state.todos = state.todos.filter((todo: ITodo) => todo.id !== action.payload);
    },
    updateTodo(state, action: PayloadAction<ITodo>) {
      const { id } = action.payload;
      const todoToUpdateIndex = state.todos.findIndex((item: ITodo) => item.id === id);
      if (todoToUpdateIndex !== -1) {
        state.todos[todoToUpdateIndex] = {
          ...state.todos[todoToUpdateIndex],
          ...action.payload
        };
      }
    },
    updateTodoParams(state, action: PayloadAction<UpdateTodoParameters>) {
      state.todoNewParams = action.payload;
    },
    updateCurrentTodo(state, action: PayloadAction<ITodo>) {
      state.currentTodo = action.payload;
    },
    setChangesRequested(state, action: PayloadAction<boolean>) {
      state.isChangesRequested = action.payload;
      if (!action.payload) {
        state.changedTodo = initialState.changedTodo;
      }
    },
    setIsLoadingTodo(state, action: PayloadAction<boolean>) {
      state.isLoadingTodo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled.type, (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
      state.isLoadingTodoList = false;
      state.isFetched = true;
      state.todoListError = "";
    });
    builder.addCase(fetchTodos.pending.type, (state) => {
      state.isLoadingTodoList = true;
      state.todoListError = "";
    });
    builder.addCase(fetchTodos.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoadingTodoList = false;
      state.todoListError = action.payload;
    });
    //update todo
    builder.addCase(updateTodoRequest.fulfilled.type, (state, action: PayloadAction<UpdatedTodoResponse>) => {
      state.isLoadingTodo = false;

      const { message, todo } = action.payload;
      if (message === "success") {
        state.isChangesRequested = false;
        state.changedTodo = initialState.changedTodo;

        // обновить одну тудуху которая приехала
        const { id } = todo;
        const todoToUpdateIndex = state.todos.findIndex((item: ITodo) => item.id === id);
        if (todoToUpdateIndex !== -1) {
          state.todos[todoToUpdateIndex] = {
            ...state.todos[todoToUpdateIndex],
            ...todo
          };
        }
      }
      if (message === "request changes") {
        state.isChangesRequested = true;
        state.changedTodo = todo;
      }
    });
    builder.addCase(updateTodoRequest.pending.type, (state) => {
      state.isLoadingTodo = true;
      state.isChangesRequested = false;
      state.changedTodo = initialState.changedTodo;
    });
    builder.addCase(updateTodoRequest.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoadingTodo = false;
      state.todoItemError = action.payload;
      state.isChangesRequested = false;
      state.changedTodo = initialState.changedTodo;
    });
  }
});

export const fetchTodos = createAsyncThunk("getTodos", async (_, thinkApi) => {
  const response = await getAllTodos();
  if (response instanceof Error) {
    return thinkApi.rejectWithValue(response.message);
  }
  return response;
});

export const updateTodoRequest = createAsyncThunk(
  "updateTodo",
  async ({ isForce, params, todo }: RequestToUpdateTodoParameters, thinkApi) => {
    const response = await requestUpdateTodo(isForce, params, todo);
    if (response instanceof Error) {
      return thinkApi.rejectWithValue(response.message);
    }
    return response;
  }
);

export const addNewGroupToTodoRequest = createAsyncThunk(
  "addNewGroupToTodo",
  async (params: { todo: ITodo; groupId: TodoGroup["id"] }, thinkApi) => {
    const { todo, groupId } = params;
    thinkApi.dispatch(setIsLoadingTodo(true));
    const response = await requestAddNewGroupToTodo(todo, groupId);
    thinkApi.dispatch(setIsLoadingTodo(false));
    if (response instanceof Error) {
      return thinkApi.rejectWithValue(response.message);
    }
    thinkApi.dispatch(updateTodo(response));
  }
);

export const deleteGroupFromTodoRequest = createAsyncThunk(
  "deleteGroupFromTodoRequest",
  async (params: { todo: ITodo; groupId: TodoGroup["id"] }, thinkApi) => {
    const { todo, groupId } = params;
    thinkApi.dispatch(setIsLoadingTodo(true));
    const response = await requestDeleteGroupFromTodo(todo, groupId);
    thinkApi.dispatch(setIsLoadingTodo(false));
    if (response instanceof Error) {
      return thinkApi.rejectWithValue(response.message);
    }
    thinkApi.dispatch(updateTodo(response));
  }
);

export const {
  addTodo,
  removeTodo,
  updateTodo,
  setChangesRequested,
  updateTodoParams,
  updateCurrentTodo,
  setIsLoadingTodo
} = todoSlice.actions;
export default todoSlice.reducer;
