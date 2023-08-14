import { useAppSelector } from "../../store/storeHooks.ts";
import {
  DropdownContainer,
  DropdownContent,
  NoGroupsNotification,
  SearchGroupInput,
  SearchGroupInputWrapper
} from "./DropdownMenu.styled.ts";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AddButton } from "../Buttons/Button.styled.ts";
import DropdownItem from "./DropdownItem.tsx";
import { TodoGroup } from "../../types/todoGroup.ts";
import { requestGetAllTodoGroups, requestGetSpecificTodoGroupsWithoutValues } from "../../http/API.ts";
import TodoGroupAddForm from "../TodoGroupAddForm/TodoGroupAddForm.tsx";
import Loader from "../Loader/Loader.tsx";

interface DropdownMenuProps {
  todo: ITodo;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ todo }) => {
  const { todo_groups } = todo;
  const { todosActiveGroupsList } = useAppSelector((state) => state.todo);

  const [inputString, setInputString] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchedGroups, setFetchedGroups] = useState<TodoGroup[]>(todosActiveGroupsList);

  const [activeAdding, setActiveAdding] = useState<boolean>(false);

  const filteredGroups = useMemo(
    () =>
      inputString === ""
        ? fetchedGroups.map(
            (item: TodoGroup) =>
              !todo_groups.includes(item.id) && <DropdownItem key={item.id} todo={todo} todoGroup={item} />
          )
        : fetchedGroups.map(
            (item: TodoGroup) =>
              !todo_groups.includes(item.id) &&
              item.title.toUpperCase().includes(inputString.toUpperCase()) && (
                <DropdownItem key={item.id} todo={todo} todoGroup={item} />
              )
          ),
    [inputString, todosActiveGroupsList, fetchedGroups, todo]
  );

  const currentGroupsIds = useMemo(() => fetchedGroups.map((item: TodoGroup) => item.id), [fetchedGroups]);

  const fetchNewItems = useCallback(async () => {
    if (todosActiveGroupsList.length) {
      try {
        const response = await requestGetSpecificTodoGroupsWithoutValues(currentGroupsIds);
        setFetchedGroups((prevGroups) => [...prevGroups, ...response]);
      } catch (e) {
        setIsLoading(false);
        return;
      }
    } else {
      try {
        const response = await requestGetAllTodoGroups();
        setFetchedGroups(response);
      } catch (e) {
        setIsLoading(false);
        return;
      }
    }
    setIsLoading(false);
  }, [currentGroupsIds]);

  const handleOnCancel = useCallback(() => {
    setActiveAdding(false);
  }, []);

  useEffect(() => {
    void fetchNewItems();
  }, [todosActiveGroupsList]);

  return (
    <DropdownContainer>
      {activeAdding && <TodoGroupAddForm onCancel={handleOnCancel} />}
      <DropdownContent>
        <SearchGroupInputWrapper>
          <SearchGroupInput
            placeholder={"Search or add new group..."}
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
          />
          <AddButton onClick={() => setActiveAdding(true)}>Add</AddButton>
        </SearchGroupInputWrapper>
        {isLoading && <Loader />}
        {fetchedGroups.length > 0 ? (
          filteredGroups
        ) : (
          <NoGroupsNotification>There is no groups. Add some by clicking "Add"</NoGroupsNotification>
        )}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default React.memo(DropdownMenu);
