import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./Reducers/TodoReducer.ts";
import todoGroupSlice from "./Reducers/TodoGroupReducer.ts";
import thunkMiddleware from "redux-thunk";
import { enableMapSet } from "immer";

enableMapSet();
export const store = configureStore({
  reducer: {
    todo: todoSlice,
    todoGroups: todoGroupSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([thunkMiddleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
