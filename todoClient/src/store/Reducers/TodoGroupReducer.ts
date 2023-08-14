import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { requestAddNewTodoGroup, requestGetAllTodoGroups } from "../../http/API.ts";
import { TodoGroup } from "../../types/todoGroup.ts";
import { addTodoGroupToExisting } from "./TodoReducer.ts";

interface IState {
  todoGroups: TodoGroup[];
  isLoadingGroups: boolean;
  isLoadingGroupItem: boolean;
  isFetched: boolean;
  activeAddingTodoId: ITodo["id"];
  todoGroupsError: string;
}

const initialState: IState = {
  todoGroups: [],
  isLoadingGroups: false,
  isLoadingGroupItem: false,
  isFetched: false,
  activeAddingTodoId: -1,
  todoGroupsError: ""
};

const todoGroupSlice = createSlice({
  name: "todoGroupSlice",
  initialState,
  reducers: {
    setActiveAddingTodoId(state, action: PayloadAction<ITodo["id"]>) {
      if (state.activeAddingTodoId === action.payload) {
        state.activeAddingTodoId = initialState.activeAddingTodoId;
      } else {
        state.activeAddingTodoId = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoGroups.fulfilled.type, (state, action: PayloadAction<TodoGroup[]>) => {
      state.todoGroups = action.payload;
      state.isLoadingGroups = false;
      state.isFetched = true;
      state.todoGroupsError = initialState.todoGroupsError;
    });
    builder.addCase(fetchTodoGroups.pending.type, (state) => {
      state.isLoadingGroups = true;
      state.todoGroupsError = initialState.todoGroupsError;
    });
    builder.addCase(fetchTodoGroups.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoadingGroups = false;
      state.todoGroupsError = action.payload;
    });
    //postTodoGroup
    builder.addCase(postTodoGroup.fulfilled.type, (state) => {
      state.isLoadingGroupItem = false;
      state.todoGroupsError = initialState.todoGroupsError;
    });
    builder.addCase(postTodoGroup.pending.type, (state) => {
      state.isLoadingGroupItem = true;
      state.todoGroupsError = initialState.todoGroupsError;
    });
    builder.addCase(postTodoGroup.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoadingGroupItem = false;
      state.todoGroupsError = action.payload;
    });
  }
});

export const postTodoGroup = createAsyncThunk("postTodoGroup", async (todoGroup: Omit<TodoGroup, "id">, thinkApi) => {
  try {
    const response = await requestAddNewTodoGroup(todoGroup);
    thinkApi.dispatch(addTodoGroupToExisting(response));
    return response;
  } catch (e) {
    return thinkApi.rejectWithValue(e);
  }
});

export const fetchTodoGroups = createAsyncThunk("getTodoGroups", async (_, thinkApi) => {
  try {
    const response = await requestGetAllTodoGroups();
    return response;
  } catch (e) {
    return thinkApi.rejectWithValue(e);
  }
});

export const { setActiveAddingTodoId } = todoGroupSlice.actions;
export default todoGroupSlice.reducer;
