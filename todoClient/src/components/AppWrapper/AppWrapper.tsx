import TodoList from "../TodoList/TodoList.tsx";
import TodoAddForm from "../TodoAddForm/TodoAddForm.tsx";
import { useCallback } from "react";
import { useAppDispatch } from "../../store/storeHooks.ts";
import { addNewTodo } from "../../http/API.ts";
import { addTodo } from "../../store/Reducers/TodoReducer.ts";
import Header from "../Header/Header.tsx";
import { Main } from "./AppWrapper.styled.ts";

const AppWrapper = () => {
  const dispatch = useAppDispatch();

  const handleAddTodo = useCallback(async (title: ITodo["title"]) => {
    if (title === "") return;
    const newTodo = await addNewTodo(title);
    if (newTodo instanceof Error) return; // обработать ошибку
    dispatch(addTodo(newTodo));
  }, []);

  return (
    <>
      <Header />
      <Main>
        <TodoAddForm onAdd={handleAddTodo} />
        <TodoList />
      </Main>
    </>
  );
};

export default AppWrapper;

// TODO: пообрабатывать ошибки с сервера, зачем-то же error мне нужен :)
