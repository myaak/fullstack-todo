import { TodoGroup } from "../../types/todoGroup.ts";
import React, { useState } from "react";
import { DropdownFilterTitle, DropdownFilterWrapper, StyledDropdownFilterItem } from "./DropdownFilter.styled.ts";
import { StyledDropdownItem } from "../DropdownMenu/DropdownMenu.styled.ts";
import { Button } from "../Buttons/Button.styled.ts";
import { useAppSelector } from "../../store/storeHooks.ts";

interface DropdownFilterProps {
  onPress: (id: TodoGroup["id"] | null) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ onPress }) => {
  const todosActiveGroupsList = useAppSelector((state) => state.todo.todosActiveGroupsList);
  const initialTitleValue = "Select group to filter...";
  const [selectedTitle, setSelectedTitle] = useState<string>(initialTitleValue);
  const [selectedId, setSelectedId] = useState<TodoGroup["id"] | null>();
  const [expanded, setExpanded] = useState<boolean>(false);
  console.log("RENDERED DROP");

  return (
    <DropdownFilterWrapper>
      <DropdownFilterTitle>
        <StyledDropdownFilterItem onClick={() => setExpanded((prev) => !prev)}>
          {selectedTitle}
        </StyledDropdownFilterItem>
        {selectedTitle !== initialTitleValue && selectedId && (
          <Button
            onClick={() => {
              setSelectedId(null);
              setSelectedTitle(initialTitleValue);
              setExpanded(false);
              onPress(null);
            }}
          >
            Clear
          </Button>
        )}
      </DropdownFilterTitle>
      {expanded &&
        todosActiveGroupsList.map((item: TodoGroup) => (
          <StyledDropdownItem
            key={item.id}
            onClick={() => {
              setSelectedId(item.id);
              setSelectedTitle(item.title);
              setExpanded(false);
              onPress(item.id);
            }}
          >
            {item.title}
          </StyledDropdownItem>
        ))}
    </DropdownFilterWrapper>
  );
};

export default React.memo(DropdownFilter);
