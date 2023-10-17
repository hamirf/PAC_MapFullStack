import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./Store";
import { ENotificationType } from "../Model/ENotificationType";

interface Notification {
  type: ENotificationType;
  message?: string;
}

interface State {
  notifications: Notification[];
}

const initialState: State = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "Notification",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    sendNotification: (state, action: PayloadAction<Notification>) => {
      if (action.payload == null) {
        throw new Error("Notification is null");
      }
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotification: (state) => {
      state.notifications = state.notifications.splice(0, 1);
    },
  },
});

// export const {
//   sendNotification,
//   removeNotification,
// } = notificationSlice.actions;

export const sendNotification = (
  type: ENotificationType,
  message: string | undefined
) => {
  const payload: Notification = {
    type: type,
    message: message,
  };
  return notificationSlice.actions.sendNotification(payload);
};

export const removeNotification = notificationSlice.actions.removeNotification;

export const notifications = (state: RootState) =>
  state.notificationReducer.notifications;

export const notificationReducer = notificationSlice.reducer;
