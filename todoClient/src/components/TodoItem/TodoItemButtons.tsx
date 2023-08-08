import React from "react";
import { CancelButton, DeleteButton, EditButton, SaveButton } from "../Buttons/Button.styled.ts";

interface ITodoItemButtons {
  editing: boolean;
  saveResult: () => void;
  toggleEdit: () => void;
  deleteItem: () => void;
  cancelEdit: () => void;
}

const TodoItemButtons: React.FC<ITodoItemButtons> = ({ editing, saveResult, toggleEdit, deleteItem, cancelEdit }) => {
  return editing ? (
    <>
      <SaveButton onClick={saveResult}>Save</SaveButton>
      <CancelButton onClick={cancelEdit}>Cancel</CancelButton>
    </>
  ) : (
    <>
      <EditButton onClick={toggleEdit}>Edit</EditButton>
      <DeleteButton onClick={deleteItem}>Delete</DeleteButton>
    </>
  );
};

export default React.memo(TodoItemButtons);
