import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { requestAddNewTodoGroup, requestGetAllTodoGroups } from "../../http/API.ts";
import { TodoGroup } from "../../types/todoGroup.ts";

interface IState {
  todoGroups: Map<TodoGroup["id"], TodoGroup["title"]>;
  isLoadingGroups: boolean;
  isLoadingGroupItem: boolean;
  isFetched: boolean;
  activeAddingTodoId: ITodo["id"];
  error: string;
}

const initialState: IState = {
  todoGroups: new Map<TodoGroup["id"], TodoGroup["title"]>(),
  isLoadingGroups: false,
  isLoadingGroupItem: false,
  isFetched: false,
  activeAddingTodoId: -1, // подход говна выбрал, но я пока не придумал как сделать лучше, по идее можно как-то с рефами потыкаться
  error: ""
};

const todoGroupSlice = createSlice({
  name: "todoGroupSlice",
  initialState,
  reducers: {
    setActiveAddingTodoId(state, action: PayloadAction<ITodo["id"]>) {
      state.activeAddingTodoId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoGroups.fulfilled.type, (state, action: PayloadAction<TodoGroup[]>) => {
      state.todoGroups = new Map(action.payload.map((item) => [item.id, item.title]));
      state.isLoadingGroups = false;
      state.isFetched = true;
      state.error = "";
    });
    builder.addCase(fetchTodoGroups.pending.type, (state) => {
      state.isLoadingGroups = true;
      state.error = "";
    });
    builder.addCase(fetchTodoGroups.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoadingGroups = false;
      state.error = action.payload;
    });
    //postTodoGroup
    builder.addCase(postTodoGroup.fulfilled.type, (state, action: PayloadAction<TodoGroup>) => {
      const { id, title } = action.payload;
      state.todoGroups = state.todoGroups.set(id, title);
      console.log(state.todoGroups);
      state.isLoadingGroupItem = false;
      state.error = "";
    });
    builder.addCase(postTodoGroup.pending.type, (state) => {
      state.isLoadingGroupItem = true;
      state.error = "";
    });
    builder.addCase(postTodoGroup.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoadingGroupItem = false;
      state.error = action.payload;
    });
  }
});

export const postTodoGroup = createAsyncThunk("postTodoGroup", async (title: TodoGroup["title"], thinkApi) => {
  const response = await requestAddNewTodoGroup(title);
  if (response instanceof Error) {
    return thinkApi.rejectWithValue(response.message);
  }

  return response;
});

export const fetchTodoGroups = createAsyncThunk("getTodoGroups", async (_, thinkApi) => {
  const response = await requestGetAllTodoGroups();
  if (response instanceof Error) {
    return thinkApi.rejectWithValue(response.message);
  }
  return response;
});

export const { setActiveAddingTodoId } = todoGroupSlice.actions;
export default todoGroupSlice.reducer;
