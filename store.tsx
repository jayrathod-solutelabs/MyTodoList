import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./src/Screen/AddTodoSlice";
export const store = configureStore({
    reducer: {
        tasks: TodoSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;