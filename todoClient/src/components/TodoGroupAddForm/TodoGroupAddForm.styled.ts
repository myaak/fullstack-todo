import { AddFormInput } from "../TodoAddForm/TodoAddForm.styled.ts";
import { styled } from "styled-components";
import { ITheme } from "../../theme/theme.ts";
import { NotificationContent } from "../Notification/Notification.styled.ts";
import { TodoGroupItemWrapper } from "../TodoGroupItem/TodoGroupItem.styled.ts";

interface TodoGroupItemPreviewProps {
  color: string;
  hoverColor: string;
}

export const GroupAddContent = styled(NotificationContent)`
  width: 300px;
  min-height: 280px;
`;

export const GroupAddForm = styled.div`
  width: 100%;
  flex-direction: column;
  gap: 15px;
  border: none;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;

  @media screen and (max-width: 799px) {
    width: 95%;
  }
`;

export const GroupAddFormInput = styled(AddFormInput)<ITheme>`
  border: 1px solid ${(props) => props.theme.mainBorderColor};
  border-radius: 5px;
`;

export const ColorPreviewCircle = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const TodoGroupItemPreview = styled(TodoGroupItemWrapper)<TodoGroupItemPreviewProps>`
  background-color: ${(props) => props.color};
  
  &:hover {
    background-color: ${(props) => props.hoverColor};
`;

export const ErrorHexCodeTitle = styled.div`
  color: #ff6969;
`;
