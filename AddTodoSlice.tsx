import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Task {
    id: String,
    title: String,
    category: 'work' | 'personal' | 'event' | 'other',
    date: String,
    time: String,
    notes: String
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

export const { addTask } = todoSlice.actions;
export default todoSlice.reducer;


