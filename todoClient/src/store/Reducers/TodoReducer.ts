import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllTodos,
  requestAddNewGroupToTodo,
  requestAddNewTodo,
  requestDeleteGroupFromTodo,
  requestGetSpecificTodoGroupsWithValues,
  requestUpdateTodo
} from "../../http/API.ts";
import {
  RequestToUpdateTodoParameters,
  UpdatedTodoResponse,
  UpdateTodoParameters
} from "../../types/updateTodoParameters.ts";
import { Helpers } from "../../types/helpers.ts";
import { TodoGroup } from "../../types/todoGroup.ts";

interface IState {
  todos: ITodo[];
  changedTodo: ITodo;
  currentTodo: ITodo;
  todosActiveGroupsList: TodoGroup[];
  todoNewParams: Helpers<UpdateTodoParameters>;
  isLoadingTodoList: boolean;
  isLoadingTodo: boolean;
  isFetchedTodos: boolean;
  isFetchedGroups: boolean;
  isChangesRequestedId: ITodo["id"];
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
  todosActiveGroupsList: [],
  todoNewParams: {},
  isLoadingTodoList: false,
  isLoadingTodo: false,
  isFetchedTodos: false,
  isFetchedGroups: false,
  isChangesRequestedId: -1,
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
    resetChangesRequestedId(state) {
      state.isChangesRequestedId = initialState.isChangesRequestedId;
      state.changedTodo = initialState.changedTodo;
    },
    setIsLoadingTodo(state, action: PayloadAction<boolean>) {
      state.isLoadingTodo = action.payload;
    },
    addTodoGroupToExisting(state, action: PayloadAction<TodoGroup>) {
      state.todosActiveGroupsList.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled.type, (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
      state.isLoadingTodoList = false;
      state.isFetchedTodos = true;
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
      state.todoItemError = initialState.todoItemError;

      const { message, todo } = action.payload;
      if (message === "success") {
        state.isChangesRequestedId = initialState.isChangesRequestedId;
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
        const { id } = todo;
        state.isChangesRequestedId = id;
        state.changedTodo = todo;
      }
    });
    builder.addCase(updateTodoRequest.pending.type, (state) => {
      state.isLoadingTodo = true;
      state.todoItemError = initialState.todoItemError;
      state.isChangesRequestedId = initialState.isChangesRequestedId;
      state.changedTodo = initialState.changedTodo;
    });
    builder.addCase(updateTodoRequest.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoadingTodo = false;
      state.todoItemError = action.payload;
      state.isChangesRequestedId = initialState.isChangesRequestedId;
      state.changedTodo = initialState.changedTodo;
    });
    //
    builder.addCase(fetchSpecificGroups.fulfilled.type, (state, action: PayloadAction<TodoGroup[]>) => {
      state.todosActiveGroupsList = action.payload;
      state.isFetchedGroups = true;
      state.isLoadingTodoList = false;
      state.todoListError = initialState.todoItemError;
    });
    builder.addCase(fetchSpecificGroups.pending.type, (state) => {
      state.isLoadingTodoList = true;
      state.todoListError = "";
    });
    builder.addCase(fetchSpecificGroups.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoadingTodoList = false;
      state.todoListError = action.payload;
    });
  }
});

export const fetchTodos = createAsyncThunk("getTodos", async (_, thinkApi) => {
  try {
    const response = await getAllTodos();
    const todosGroupsList = Array.from(new Set(response.flatMap((item: ITodo) => item.todo_groups))).sort(); // достать только те группы, которые есть у тудух
    await thinkApi.dispatch(fetchSpecificGroups(todosGroupsList));
    return response;
  } catch (e) {
    return thinkApi.rejectWithValue(e);
  }
});

export const fetchSpecificGroups = createAsyncThunk(
  "getSpecificGroups",
  async (groups: ITodo["todo_groups"], thinkApi) => {
    try {
      const response = await requestGetSpecificTodoGroupsWithValues(groups);
      return response;
    } catch (e) {
      return thinkApi.rejectWithValue(e);
    }
  }
);

export const addNewTodo = createAsyncThunk("addNewTodo", async (newTodoTitle: ITodo["title"], thinkApi) => {
  try {
    const response = await requestAddNewTodo(newTodoTitle);
    await thinkApi.dispatch(addTodo(response));
    return response;
  } catch (e) {
    return thinkApi.rejectWithValue(e);
  }
});

export const updateTodoRequest = createAsyncThunk(
  "updateTodo",
  async ({ isForce, params, todo }: RequestToUpdateTodoParameters, thinkApi) => {
    try {
      const response = await requestUpdateTodo(isForce, params, todo);
      return response;
    } catch (e) {
      return thinkApi.rejectWithValue(e);
    }
  }
);

export const addNewGroupToTodoRequest = createAsyncThunk(
  "addNewGroupToTodo",
  async (params: { todo: ITodo; groupId: TodoGroup["id"] }, thinkApi) => {
    try {
      const { todo, groupId } = params;
      thinkApi.dispatch(setIsLoadingTodo(true));
      const response = await requestAddNewGroupToTodo(todo, groupId);
      await thinkApi.dispatch(updateTodo(response));
      thinkApi.dispatch(setIsLoadingTodo(false));
    } catch (e) {
      thinkApi.dispatch(setIsLoadingTodo(false));
      return thinkApi.rejectWithValue(e);
    }
  }
);

export const deleteGroupFromTodoRequest = createAsyncThunk(
  "deleteGroupFromTodoRequest",
  async (params: { todo: ITodo; groupId: TodoGroup["id"] }, thinkApi) => {
    try {
      const { todo, groupId } = params;
      thinkApi.dispatch(setIsLoadingTodo(true));
      const response = await requestDeleteGroupFromTodo(todo, groupId);
      await thinkApi.dispatch(updateTodo(response));
      thinkApi.dispatch(setIsLoadingTodo(false));
    } catch (e) {
      thinkApi.dispatch(setIsLoadingTodo(false));
      return thinkApi.rejectWithValue(e);
    }
  }
);

export const {
  addTodo,
  removeTodo,
  updateTodo,
  resetChangesRequestedId,
  updateTodoParams,
  updateCurrentTodo,
  addTodoGroupToExisting,
  setIsLoadingTodo
} = todoSlice.actions;
export default todoSlice.reducer;
