import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../../store";
import { CategoryType } from '../utils/categoryUtils';
import { API_METHODS } from '../api/apiMethods';
import { TASKS_ENDPOINT } from '../api/endpoints';
import { apiRequest } from '../api/apiManager';


export interface Task {
    id: string;
    description: string;
    completed: boolean;
    meta: {
      title: string;
      category: string;
      date: string;
      time: string;
    };
  }

  interface TodoState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
  }

  const initialState: TodoState = {
    tasks: [] as Task[],
    loading: false,
    error: null,
    
  };


  export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (task: Task, { rejectWithValue }) => {
      try {
        const updatedTask = {
          description: task.description,
          completed: task.completed,
          meta: {
            title: task.meta.title,
            category: task.meta.category,
            date: task.meta.date,
            time: task.meta.time,
          },
        };
  
        const response = await apiRequest("PUT", `/todos/${task.id}`, updatedTask);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to update task");
      }
    }
  );

  export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (taskData: Omit<Task, "id" | "completed">) => {
      try {
        const response = await apiRequest<Task>(
          API_METHODS.POST,
          TASKS_ENDPOINT,
          taskData
        );
        return response;
      } catch (error) {
        console.error("Failed to add task:", error);
        throw error;
      }
    }
  );
  
  


  export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    try {
      const response = await apiRequest<Task[]>(API_METHODS.GET, TASKS_ENDPOINT);
      return response;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      throw error;
    }
  });
  
  
  const todoSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        toggleTaskCompletion: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },

    },
    extraReducers: (builder) => {
      builder
        .addCase(addTask.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addTask.fulfilled, (state, action) => {
          state.loading = false;
          state.tasks.push(action.payload);
        })
        .addCase(addTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to add task";
        })
        // ✅ Add fetchTasks handling
        .addCase(fetchTasks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
          state.loading = false;
          state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to fetch tasks";
        })
        .addCase(updateTask.pending, (state) => {
            state.loading = true;
          })
          .addCase(updateTask.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.tasks.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
              state.tasks[index] = action.payload;
            }
          })
          .addCase(updateTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })
        ;
        
    },
  });
  


export const completedTasks = (state: RootState) => {
    return state.tasks.tasks.filter((task) => task.completed);
};

export const pendingTasks = (state: RootState) => {
    return state.tasks.tasks.filter((task) => !task.completed);
};

export default todoSlice.reducer;


