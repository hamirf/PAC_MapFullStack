import { configureStore, createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { notificationReducer } from "./NotificationSlice";
import { moduleStatusReducer } from "./ModuleStatusSlice";
import signalRMiddleware from "./SignalrMiddleware";

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware();

export const store = configureStore({
  reducer: {
    moduleStatusReducer,
    notificationReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([signalRMiddleware]).concat([immutableInvariantMiddleware]);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export function getDispatch() {
  return store.dispatch;
}
