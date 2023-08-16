import TodoAddForm from "../TodoAddForm/TodoAddForm.tsx";
import { useCallback } from "react";
import { useAppDispatch } from "../../store/storeHooks.ts";
import { addNewTodo } from "../../store/Reducers/TodoReducer.ts";
import Header from "../Header/Header.tsx";
import { Main } from "./AppWrapper.styled.ts";
import TodoListWrapper from "../TodoList/TodoListWrapper.tsx";

const AppWrapper = () => {
  const dispatch = useAppDispatch();

  const handleAddTodo = useCallback(async (title: ITodo["title"]) => {
    const titleWithNoSpaces = title.trim();
    if (titleWithNoSpaces === "") return;
    dispatch(addNewTodo(titleWithNoSpaces));
  }, []);

  return (
    <>
      <Header />
      <Main>
        <TodoAddForm onAdd={handleAddTodo} />
        <TodoListWrapper />
      </Main>
    </>
  );
};

export default AppWrapper;

// TODO: пообрабатывать ошибки с сервера, зачем-то же error мне нужен :)
