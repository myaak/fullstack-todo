import React, { useState } from "react";
import { AddForm, AddFormInput } from "./TodoAddForm.styled.ts";
import { AddButton } from "../Buttons/Button.styled.ts";

interface ITodoAddForm {
  onAdd: (title: string) => void;
}
const TodoAddForm: React.FC<ITodoAddForm> = ({ onAdd }) => {
  const [newTitle, setNewTitle] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(newTitle);
    setNewTitle("");
  };

  return (
    <AddForm onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleAddTodo(event)}>
      <AddFormInput
        placeholder={"Add todo here..."}
        value={newTitle}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)}
        maxLength={50}
      ></AddFormInput>
      <AddButton>Add new Todo</AddButton>
    </AddForm>
  );
};

export default TodoAddForm;
