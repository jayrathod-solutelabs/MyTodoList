import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./src/Screen/AddTodoSlice";
import AuthSlice from "./src/Screen/AuthSlice";

export const store = configureStore({
    reducer: {
        tasks: TodoSlice,
        auth: AuthSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;