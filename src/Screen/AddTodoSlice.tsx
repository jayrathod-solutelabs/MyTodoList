import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../../store";
import { CategoryType } from '../utils/categoryUtils';


export interface Task {
    id: string,
    title: string,
    category: CategoryType,
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
        },

        toggleTaskCompletion: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.isCompleted = !task.isCompleted;
            }
        },

        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
    }
})



export const completedTasks = (state: RootState) => {
    return state.tasks.tasks.filter((task) => task.isCompleted);
};

export const pendingTasks = (state: RootState) => {
    return state.tasks.tasks.filter((task) => !task.isCompleted);
};

export const { addTask, toggleTaskCompletion, updateTask } = todoSlice.actions;
export default todoSlice.reducer;


