import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "./store";


export interface Task {
    id: string,
    title: string,
    category: 'work' | 'personal' | 'event' | 'other',
    date: string,
    time: string,
    notes: string
    isCompleted: boolean
}

interface TodoState {
    tasks: Task[]
}

const initialState: TodoState = {
    tasks: []
}

const todoSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        }
    }
})



export const completedTasks = (state: RootState) => {
    return state.tasks.tasks.filter((task) => task.isCompleted);
};

export const pendingTasks = (state: RootState) => {
    return state.tasks.tasks.filter((task) => !task.isCompleted);
};

export const { addTask } = todoSlice.actions;
export default todoSlice.reducer;


