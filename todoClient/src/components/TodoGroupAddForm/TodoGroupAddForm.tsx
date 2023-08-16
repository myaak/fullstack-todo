import {
  NotificationButtonsWrapper,
  NotificationOverlay,
  NotificationTitle
} from "../Notification/Notification.styled.ts";
import {
  ErrorHexCodeTitle,
  GroupAddContent,
  GroupAddForm,
  GroupAddFormInput,
  TodoGroupItemPreview
} from "./TodoGroupAddForm.styled.ts";
import { useCallback, useMemo, useState } from "react";
import { generateHoverColor, isValidHexColor } from "./helper.ts";
import { theme } from "../../theme/theme.ts";
import { Button, CancelButton } from "../Buttons/Button.styled.ts";
import { useAppDispatch } from "../../store/storeHooks.ts";
import { postTodoGroup } from "../../store/Reducers/TodoGroupReducer.ts";
import { TodoGroup } from "../../types/todoGroup.ts";

interface TodoGroupAddFormProps {
  onCancel: () => void;
}

const TodoGroupAddForm: React.FC<TodoGroupAddFormProps> = ({ onCancel }) => {
  const dispatch = useAppDispatch();

  const [newTodoGroupTitle, setNewTodoGroupTitle] = useState<string>("");
  const [primaryHexCode, setPrimaryHexCode] = useState<string>(theme.mainBgColor);
  const validHex = useMemo(() => isValidHexColor(primaryHexCode), [primaryHexCode]);

  const hoverHexCode = useMemo(() => generateHoverColor(primaryHexCode, -15), [primaryHexCode]);

  const handleAddNewGroup = useCallback(async () => {
    const titleWithNoSpaces = newTodoGroupTitle.trim();
    if (!validHex || titleWithNoSpaces === "") return;
    const newTodoGroup: Omit<TodoGroup, "id"> = {
      title: titleWithNoSpaces,
      color: primaryHexCode,
      hoverColor: hoverHexCode
    };
    await dispatch(postTodoGroup(newTodoGroup));
    setNewTodoGroupTitle("");
    onCancel();
  }, [newTodoGroupTitle, primaryHexCode, validHex]);

  return (
    <NotificationOverlay>
      <GroupAddContent>
        <NotificationTitle>Add new ToDo group</NotificationTitle>
        <GroupAddForm>
          <GroupAddFormInput
            placeholder={"ToDo group title"}
            value={newTodoGroupTitle}
            maxLength={15}
            onChange={(e) => setNewTodoGroupTitle(e.target.value)}
          />
          <GroupAddFormInput
            placeholder={`ToDo group color ${primaryHexCode}`}
            value={primaryHexCode}
            onChange={(e) => setPrimaryHexCode(e.target.value)}
          />
          {!validHex && <ErrorHexCodeTitle>Invalid hex code</ErrorHexCodeTitle>}
          <TodoGroupItemPreview color={validHex ? primaryHexCode : theme.mainBgColor} hoverColor={hoverHexCode}>
            {newTodoGroupTitle === "" ? "Test your group item" : newTodoGroupTitle}
          </TodoGroupItemPreview>
          <NotificationButtonsWrapper>
            <Button onClick={handleAddNewGroup}>Add new</Button>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
          </NotificationButtonsWrapper>
        </GroupAddForm>
      </GroupAddContent>
    </NotificationOverlay>
  );
};

export default TodoGroupAddForm;
