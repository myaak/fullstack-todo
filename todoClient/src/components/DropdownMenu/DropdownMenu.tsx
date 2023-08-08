import { useAppDispatch, useAppSelector } from "../../store/storeHooks.ts";
import {
  DropdownContainer,
  DropdownContent,
  SearchGroupInput,
  SearchGroupInputWrapper
} from "./DropdownMenu.styled.ts";
import React, { useCallback, useMemo, useState } from "react";
import { AddButton } from "../Buttons/Button.styled.ts";
import { postTodoGroup } from "../../store/Reducers/TodoGroupReducer.ts";
import DropdownItem from "./DropdownItem.tsx";

interface DropdownMenuProps {
  todo: ITodo;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ todo }) => {
  const { todo_groups } = todo;
  const { todoGroups } = useAppSelector((state) => state.todoGroups);

  const dispatch = useAppDispatch();

  const [inputString, setInputString] = useState<string>("");

  const filteredGroups = useMemo(
    () =>
      inputString === ""
        ? Array.from(todoGroups)
            .reverse()
            .map(([key, value]) => !todo_groups.includes(key) && <DropdownItem key={key} id={key} title={value} />)
        : Array.from(todoGroups)
            .reverse()
            .map(
              ([key, value]) =>
                !todo_groups.includes(key) &&
                value.toUpperCase().includes(inputString.toUpperCase()) && (
                  <DropdownItem key={key} id={key} title={value} />
                )
            ),
    [inputString, todoGroups, todo_groups]
  );

  const handleAddNewGroup = useCallback(async () => {
    if (inputString === "") return;

    await dispatch(postTodoGroup(inputString));
    setInputString("");
  }, [inputString]);

  return (
    <DropdownContainer>
      <DropdownContent>
        <SearchGroupInputWrapper>
          <SearchGroupInput
            placeholder={"Search or add new group..."}
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
          />
          <AddButton onClick={handleAddNewGroup}>Add</AddButton>
        </SearchGroupInputWrapper>
        {filteredGroups}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default React.memo(DropdownMenu);
