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
      isCompleted : boolean;
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
          completed: task.meta.isCompleted ? 1 : 0,
          meta: {
            title: task.meta.title,
            category: task.meta.category,
            date: task.meta.date,
            time: task.meta.time,
            isCompleted: task.meta.isCompleted
          },
        };
  
        const response = await apiRequest(API_METHODS.PUT, `/todos/${task.id}`, updatedTask);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to update task");
      }
    }
  );
  export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (taskData: Omit<Task, "id">) => {
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
            const taskId = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (task) {
              task.meta.isCompleted = !task.meta.isCompleted;
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
        .addCase(updateTask.fulfilled, (state) => {
            state.loading = false;
        })
        // .addCase(updateTask.fulfilled, (state, action) => {
        //     if (!action.payload || !action.payload.id) {
        //       console.error("Update Task Error: Invalid response payload", action.payload);
        //       return;
        //     }
        
        //     const updatedTask = action.payload;
        //     const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
        
        //     if (index !== -1) {
        //       state.tasks[index] = { ...state.tasks[index], ...updatedTask };
        //     }
        
        //     console.log("Updated task successfully:", updatedTask);
        //   })
        
        .addCase(updateTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        
        ;
        
    },
  });
  


export const completedTasks = (state: RootState) => {
    return state.tasks.tasks.filter((task) => task.meta.isCompleted);
};

export const pendingTasks = (state: RootState) => {
    return state.tasks.tasks.filter((task) => !task.meta.isCompleted);
};


export default todoSlice.reducer;
export const { toggleTaskCompletion } = todoSlice.actions;

