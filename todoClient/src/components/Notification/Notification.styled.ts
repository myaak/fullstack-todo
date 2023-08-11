import { styled } from "styled-components";
import { ITheme } from "../../theme/theme.ts";

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

export const NotificationTitle = styled.div<ITheme>`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${(props) => props.theme.mainBgColor};
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

export const NotificationButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
