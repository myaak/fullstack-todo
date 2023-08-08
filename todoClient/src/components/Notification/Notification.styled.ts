import { styled } from "styled-components";

export const NotificationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2023;
`;

export const NotificationContent = styled.div`
  width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const NotificationTitle = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #8c94e5;
`;
export const NotificationCause = styled(NotificationTitle)`
  margin: 0;
  font-size: 16px;
`;

export const NotificationItem = styled.div`
  margin-bottom: 12px;

  & p {
    margin: 0;
  }
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const NotificationButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
