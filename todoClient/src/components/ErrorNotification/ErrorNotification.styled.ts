import { styled } from "styled-components";

export const ErrorNotificationWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  background-color: #ff6969;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;

export const ErrorNotificationTitle = styled.div`
  color: #000000;
`;

export const ErrorNotificationContent = styled.div`
  color: #000000;
`;
